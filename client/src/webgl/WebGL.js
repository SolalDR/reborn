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
import LineSystem from './components/line/LineSystem';

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
        this.clusters[modelName] = new Cluster(models[modelName].scene.children[0].geometry, material);
        this.scene.add(this.clusters[modelName].mesh);
      });

      this.emit('clusters:created');
    };

    AssetsManager.get('models').then((models) => {
      initClusters(models);
    });

    AssetsManager.get('images').then((images) => {
      const geometry = new THREE.Geometry();
      const cloudPath = images.cloud_line.paths[0];
      cloudPath.currentPath.getPoints(100).forEach((point, i) => {
        geometry.vertices.push(
          new THREE.Vector3(point.x, -point.y, Math.cos(i / 200) * 3)
            .multiplyScalar(0.5),
        );
      });

      this.clouds = new LineSystem(geometry, {
        map: images.cloud_brush,
      });
      this.clouds.mesh.position.y = 20;

      for (let i = 0; i < 100; i++) {
        this.clouds.addItem({
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            10,
            (Math.random() - 0.5) * 10,
          ),
          rotation: new THREE.Euler(
            Math.random() * 2 * Math.PI,
            Math.random() * 2 * Math.PI,
            Math.random() * 2 * Math.PI,
          ),
          dashOffset: Math.random() * 2,
        });
      }

      this.scene.add(this.clouds.mesh);
    });
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
    if (this.clouds) {
      this.clouds.mesh.material.uniforms.dashOffset.value += 0.03;
    }
    this.renderer.render();
  }
}
