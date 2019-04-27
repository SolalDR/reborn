import Emitter from '@solaldr/emitter';
import Viewport from '../plugins/Viewport';
import GameMap from './components/map';
import Controls from './controls';
import Cluster from './components/cluster';
import Raycaster from './core/Raycaster';
import mouse from '../plugins/Mouse';
import AssetsManager from '../services/assets/Manager';
import Renderer from './renderer';

export default class WebGL extends Emitter {
  constructor({
    canvas = null,
    store = null,
  } = {}) {
    super();
    this.canvas = canvas;
    this.store = store;

    if (this.store.state.game) {
      this.game = this.store.state.game;
    }

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

    this.initCluster();
    this.initScene();
    this.loop();
  }

  initCluster() {
    this.clusters = new Map();
    const models = AssetsManager.loader.getFiles('models');
    const material = new THREE.MeshToonMaterial({
      vertexColors: THREE.VertexColors,
    });

    Object.keys(models).forEach((modelName) => {
      this.clusters.set(modelName, new Cluster(models[modelName].result.scene.children[0].geometry, material));
      const cluster = this.clusters.get(modelName);
      if (this.game.entityModels.has(modelName)) {
        this.game.entityModels.get(modelName).cluster = cluster;
        this.scene.add(cluster.mesh);
      }
    });
  }

  initScene() {
    this.scene.fog = new THREE.Fog(0xb7eeff, 60, 150);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this.scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    this.scene.add(light);

    this.map = new GameMap({
      cellSize: 1,
      size: new THREE.Vector2(32, 32),
      raycaster: this.raycaster,
    });

    this.scene.add(this.map);

    mouse.$on('click', () => {
      if (!mouse.dragDelta && this.raycaster.intersection) {
        this.emit('addItem', {
          position: this.map.gridHelper.position,
          rotation: new THREE.Euler(0, Math.PI * 2 * Math.random(), 0),
        });
      }
    });

    AssetsManager.loader.on('load:models', (results) => {
      const material = new THREE.MeshToonMaterial({
        vertexColors: THREE.VertexColors,
      });
      const cubeCluster = new Cluster(results.house.result.scene.children[0].geometry, material);

      this.scene.add(cubeCluster.mesh);
    });


    light.position.set(100, 100, 100);
    this.camera.position.set(0, 20, 20);
    this.camera.lookAt(new THREE.Vector3());
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.controls.loop();
    this.renderer.render();
  }
}
