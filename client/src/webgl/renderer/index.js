
import {
  EffectComposer, EffectPass, RenderPass, BloomEffect,
} from 'postprocessing';
import Viewport from '../../plugins/Viewport';
import SobelEffect from './effects/SobelEffect';
import FilmEffect from './effects/FilmEffect';
import GUI from '../../plugins/GUI';
import theme from '@/config/theme';
import mouse from '@/plugins/Mouse';

let swap = 1;

export default class Renderer {
  constructor({
    canvas = null,
    scene = null,
    camera = null,
  } = {}) {
    this.canvas = canvas;
    this.scene = scene;

    this.camera = camera;
    this.clock = new THREE.Clock();
    this.gui = GUI.rendering;

    this.initPickingScene();
    this.initRenderer();
    this.initComposer();
    this.initEvents();

    this.initGUI();

    this.raycaster = new THREE.Raycaster();
  }

  pick() {
    this.raycaster.setFromCamera(mouse.normalized, this.camera);
    const intersects = this.raycaster.intersectObjects(this.pickingScene.children);
    return intersects[0] ? intersects[0].object.name : null;
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.renderer.setClearColor(theme.water.color);
    this.scene.background = new THREE.Color(theme.water.color);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(Viewport.width, Viewport.height);
  }

  initPickingScene() {
    this.pickingScene = new THREE.Scene();
    this.pickingScene.name = 'picking';
    this.pickingScene.background = new THREE.Color(0xFFFFFF);
  }

  initComposer() {
    this.composer = new EffectComposer(this.renderer);
    this.sobelEffect = new SobelEffect({
      step: 0.01,
      intensity: 10,
      threshold: 0.001,
    });

    this.filmEffect = new FilmEffect();
    this.bloomEffect = new BloomEffect({
      distinction: 1.0,
      resolutionScale: 0.5,
    });
    const effectPass = new EffectPass(this.camera, this.filmEffect, this.sobelEffect);

    effectPass.dithering = true;
    effectPass.renderToScreen = true;

    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(effectPass);
  }

  initEvents() {
    Viewport.$on('resize', () => {
      this.renderer.setSize(Viewport.width, Viewport.height);
      this.composer.setSize(Viewport.width, Viewport.height);
      this.camera.aspect = Viewport.ratio;
      this.camera.updateProjectionMatrix();
    });
  }

  render() {
    swap += 1;
    if (swap % 3 === 0) {
      swap = 0;
      this.filmEffect.uniforms.get('offset').value = Math.random();
    }

    this.composer.render(this.clock.getDelta());
  }

  initGUI() {
    const sobelFolder = this.gui.addFolder('Sobel');
    sobelFolder.add(this.sobelEffect.uniforms.get('step'), 'value', 0, 6).name('Step');
    sobelFolder.add(this.sobelEffect.uniforms.get('intensity'), 'value', 0, 100).name('Intensity');
    sobelFolder.add(this.sobelEffect.uniforms.get('threshold'), 'value', 0, 1).name('threshold');

    const bloomFolder = this.gui.addFolder('Bloom');
    bloomFolder.add(this.bloomEffect, 'distinction', 0, 5).name('Distinction');
  }
}
