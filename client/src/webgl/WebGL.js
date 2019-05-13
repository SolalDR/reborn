import Emitter from '@solaldr/emitter';
import Viewport from '../plugins/Viewport';
import GameMap from './components/map';
import Controls from './controls';
import Raycaster from './core/Raycaster';
import mouse from '../plugins/Mouse';
import AssetsManager from '../services/assets/Manager';
import Renderer from './renderer';
import generateMap from './components/map/generator/Generator';
import GUI from '@/plugins/GUI';
import modelsConfig from '@/config/models';
import EntityModelGroup from './components/game/EntityModelGroup';
import WorldScreen from './components/WorldScreen.js';
import { Clouds, Waves } from './components/world'

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
    this.scene.name = 'main';
    this.camera = new THREE.PerspectiveCamera(45, Viewport.width / Viewport.height, 1, 500);

    this.controls = new Controls({
      camera: this.camera,
    });

    this.worldScreen = new WorldScreen({
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
    this.initModels();
    this.initMap();
    this.initLights();
    this.initScene();
    this.initGUI();
    this.loop();
  }

  initModels() {
    const initModels = (models) => {
      this.models = {};
      const material = new THREE.MeshToonMaterial({
        vertexColors: THREE.VertexColors,
      });

      Object.keys(models).forEach((modelName, index) => {
        this.models[modelName] = new EntityModelGroup(modelName, {
          geometry: models[modelName].scene.children[0].geometry,
          material,
          slot: index,
        });

        if (modelsConfig.picking) {
          this.scene.add(this.models[modelName].pickingCluster.mesh);
          this.renderer.pickingScene.add(this.models[modelName].entityCluster.mesh);
        } else {
          this.scene.add(this.models[modelName].entityCluster.mesh);
          this.renderer.pickingScene.add(this.models[modelName].pickingCluster.mesh);
        }
      });

      this.emit('clusters:created');
    };

    AssetsManager.get('models').then((models) => {
      initModels(models);
    });

    AssetsManager.get('images').then((images) => {
      var clouds = new Clouds({
        path: images.cloud_line.paths[0],
        brush: images.cloud_brush
      });

      this.waves = new Waves({
        path: images.wave_line.paths[0],
        brush: images.cloud_brush,
      });

      this.scene.add(this.waves.mesh);
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
          const {id, slot} = this.renderer.pick(event.clientX, event.clientY);
          if (id === 255 && slot === 255) {
            this.emit('addItem', {
              position: this.map.gridHelper.position,
              rotation: new THREE.Euler(0, Math.floor(Math.random() * 4) * Math.PI / 2, 0),
            });
          } else {
            const model = this.findModelWithSlot(slot);
            const entity = model.getItem(id);
            if (entity) {
              this.emit('selectItem', entity);
            }
          }
        }
      });

      this.emit('map:created');
    });
    return mapPromise;
  }

  initScene() {
    this.camera.position.set(0, 30, 30);
    this.camera.lookAt(new THREE.Vector3());
  }

  initLights() {
    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    this.scene.add(this.directionalLight);

    this.directionalLight.position.set(100, 100, 100);
  }

  findModelWithSlot(slot) {
    var model = null;
    Object.keys(this.models).forEach(slug => {
      if (this.models[slug].slot === slot) {
        model = this.models[slug];
      }
    })
    return model;
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.controls.loop();
    if (this.waves) this.waves.render();
    this.worldScreen.render();
    this.renderer.render();
  }

  initGUI() {
    GUI.rendering.addLight('Ambient', this.ambientLight);
    GUI.rendering.addLight('Directional', this.directionalLight);
  }
}
