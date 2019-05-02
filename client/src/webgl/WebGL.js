import Emitter from '@solaldr/emitter';
import Viewport from '../plugins/Viewport';
import GameMap from './components/map';
import Controls from './controls';
import Cluster from './components/cluster';
import Raycaster from './core/Raycaster';
import mouse from '../plugins/Mouse';
import AssetsManager from '../services/assets/Manager';
import Renderer from './renderer';
import generateMap from './components/map/generator/Generator';


export default class WebGL extends Emitter {
  constructor({
    canvas = null,
    game = null,
  } = {}) {
    super();
    this.canvas = canvas;
    this.game = game;

    // Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, Viewport.width / Viewport.height, 1, 100);
    this.controls = new Controls({
      camera: this.camera,
    });

    this.renderer = new Renderer({
      canvas,
      scene: this.scene,
      camera: this.camera,
    });

    this.raycaster = new Raycaster({
      scene: this.scene,
      camera: this.camera,
    });
  }

  init() {
    this.initClusters();
    this.initMap();
    this.initLights();
    this.initScene();
    this.loop();
  }

  initClusters() {
    const initClusters = (models) => {
      this.clusters = {};
      const material = new THREE.MeshToonMaterial({
        vertexColors: THREE.VertexColors,
      });

      Object.keys(models).forEach((modelName) => {
        this.clusters[modelName] = new Cluster(models[modelName].result.scene.children[0].geometry, material);
        this.scene.add(this.clusters[modelName].mesh);
      });

      this.emit('clusters:created');
    };

    if (AssetsManager.loader.isLoaded('models')) {
      const models = AssetsManager.loader.getFiles('models');
      initClusters(models);
    } else {
      AssetsManager.loader.on('load:models', (models) => {
        initClusters(models);
      });
    }
  }

  initMap() {
    const mapPromise = generateMap(this.game.seed);
    mapPromise.then(({ gridDatas, geometry }) => {
      this.map = new GameMap({
        gridDatas: Array.from(gridDatas),
        geometry,
        cellSize: 1,
        size: new THREE.Vector2(32, 32),
        raycaster: this.raycaster,
      });

      this.scene.add(this.map);

      mouse.$on('click', ({ event }) => {
        if (!mouse.dragDelta && this.raycaster.intersection && event.target === this.canvas) {
          this.emit('addItem', {
            position: this.map.gridHelper.position,
            rotation: new THREE.Euler(0, Math.floor(Math.random() * 4) * Math.PI / 2, 0),
          });
        }
      });

      this.emit('map:created');
    });
    return mapPromise;
  }

  initScene() {
    this.scene.fog = new THREE.Fog(0xb7eeff, 60, 150);
    this.camera.position.set(0, 20, 20);
    this.camera.lookAt(new THREE.Vector3());
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this.scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    this.scene.add(light);

    light.position.set(100, 100, 100);
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.controls.loop();
    this.renderer.render();
  }
}
