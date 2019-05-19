import Emitter from '@solaldr/emitter';
import Viewport from '@/plugins/Viewport';
import GUI from '@/plugins/GUI';
import modelsConfig from '@/config/models';
import GameMap from './components/map';
import Controls from './controls';
import Raycaster from './core/Raycaster';
import mouse from '../plugins/Mouse';
import AssetsManager from '../services/assets/Manager';
import Renderer from './renderer';
import generateMap from './components/map/generator/Generator';
import EntityModelGroup from './components/game/EntityModelGroup';
import WorldScreen from './components/WorldScreen.js';
import { Waves } from './components/world';
import ExplosionEffect from './components/game/effects/Explosion';

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
    this.initEnvironnment();
    this.initMap();
    this.initScene();
    this.initGUI();
    this.loop();
  }

  /**
   * Init models group
   * @return {void}
   */
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

      // TODO: rename in models:created
      this.emit('clusters:created');
    };

    AssetsManager.get('models').then((models) => {
      initModels(models);
    });
  }

  /**
   * Init map surroundings (birds, explosions, waves)
   * @return {void}
   */
  initEnvironnment() {
    AssetsManager.get('images').then((images) => {
      this.waves = new Waves({ path: images.wave_line.paths[0] });
      this.scene.add(this.waves.mesh);

      this.explosionEffect = new ExplosionEffect();
      this.scene.add(this.explosionEffect.mesh);
    });
  }

  /**
   * Init map and grid system
   * @return {void}
   */
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
      mouse.$on('click', this.onMouseClick.bind(this));
      this.emit('map:created');
    });

    return mapPromise;
  }

  /**
   * Init camera and lights
   * @return {void}
   */
  initScene() {
    this.camera.position.set(0, 30, 30);
    this.camera.lookAt(new THREE.Vector3());

    this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    this.scene.add(this.directionalLight);

    this.directionalLight.position.set(100, 100, 100);
  }

  /**
   * On mouse click
   * @param {Object} params.event The mouse click event
   * @param {int} params.duration The delta time between mousedown and mouseup
   */
  onMouseClick({ event, duration }) {
    // Compute distance dragged
    const delta = mouse.dragDelta ? Math.sqrt(mouse.dragDelta.x ** 2, mouse.dragDelta.x ** 2) : 0;

    // If dragged distance less than 10 & click duration less than 70ms
    if ((delta < 10 || duration < 70) && this.raycaster.intersection && event.target === this.canvas) {
      // Read in pickingScene
      const { id, slot } = this.renderer.pick(event.clientX, event.clientY);
      // This place is free
      if (id === 255 && slot === 255) {
        this.emit('addItem', {
          position: this.map.gridHelper.position,
          rotation: new THREE.Euler(0, Math.floor(Math.random() * 4) * Math.PI / 2, 0),
        });
      // There is already an entity
      } else {
        const model = this.findModelWithSlot(slot);
        const entity = model.getItem(id);
        if (entity) {
          this.emit('selectItem', entity);
        }
      }
    }
  }

  /**
   * A slot is an id set between 0 & 255. It represent the channel RED in the picking scene
   * @param  {int} slot The slot of the model
   * @return {EntityModel}
   */
  findModelWithSlot(slot) {
    let model = null;
    Object.keys(this.models).forEach((slug) => {
      if (this.models[slug].slot === slot) {
        model = this.models[slug];
      }
    });
    return model;
  }

  /**
   * Run once when initializing
   * @param  {[string]} models
   * @param {} [varname] [description]
   */
  fillRandom(models) {
    let model = null;
    const entities = [];
    while (entities.length < 50) {
      const i = Math.floor(Math.random() * this.map.grid.length);
      if (this.map.grid[i] !== null) {
        model = models[Math.floor(Math.random() * models.length)];
        const coords = this.map.grid.getCoord(i);
        entities.push({
          model,
          position: new THREE.Vector3(coords.x, this.map.grid[i].altitude, coords.y),
          rotation: new THREE.Euler(0, Math.floor(Math.random() * 4) * Math.PI / 2, 0),
        });
      }
    }
    return entities;
  }

  /**
   * RAF method
   * @return {void}
   */
  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.controls.loop();

    if (this.waves) this.waves.render();
    if (this.explosionEffect) this.explosionEffect.render();

    this.worldScreen.render();
    this.renderer.render();
  }

  initGUI() {
    GUI.rendering.addLight('Ambient', this.ambientLight);
    GUI.rendering.addLight('Directional', this.directionalLight);
  }
}
