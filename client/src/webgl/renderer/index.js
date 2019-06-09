
import {
  EffectComposer, EffectPass, RenderPass, BloomEffect,
} from 'postprocessing';
import Viewport from '../../plugins/Viewport';
import SobelEffect from './effects/SobelEffect';
import FilmEffect from './effects/FilmEffect';
import GUI from '../../plugins/GUI';

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
  }

  pick(x, y) {
    this.renderer.setRenderTarget(this.pickingTexture);
    this.renderer.render(this.pickingScene, this.camera);
    this.renderer.setRenderTarget(null);

    const pixelBuffer = new Uint8Array(4);
    this.renderer.readRenderTargetPixels(this.pickingTexture, x, this.pickingTexture.height - y, 1, 1, pixelBuffer);

    return {
      id: pixelBuffer[2],
      slot: pixelBuffer[0],
    };
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
    });
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.renderer.setClearColor(0xb7eeff);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(Viewport.width, Viewport.height);
  }

  initPickingScene() {
    this.pickingScene = new THREE.Scene();
    this.pickingScene.name = 'picking';
    this.pickingScene.background = new THREE.Color(0xFFFFFF);
    this.pickingTexture = new THREE.WebGLRenderTarget(Viewport.width, Viewport.height);
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
      this.pickingTexture.setSize(Viewport.width, Viewport.height);
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
