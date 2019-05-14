
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
    // const pixelRatio = this.renderer.getPixelRatio();
    // this.camera.setViewOffset(
    //   this.renderer.context.drawingBufferWidth,   // full width
    //   this.renderer.context.drawingBufferHeight,  // full top
    //   event.clientX * pixelRatio | 0,        // rect x
    //   event.clientY * pixelRatio | 0,        // rect y
    //   1,                                     // rect width
    //   1,                                     // rect height
    // );
    this.renderer.render(this.pickingScene, this.camera, this.pickingTexture);
    // this.camera.clearViewOffset();

    // this.renderer.readRenderTargetPixels(this.pickingTexture, 0, 0, 1, 1, pixelBuffer);
    const pixelBuffer = new Uint8Array(4);
    this.renderer.readRenderTargetPixels(
      this.pickingTexture,
      x,
      this.pickingTexture.height - y,
      1,
      1,
      pixelBuffer,
    );

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
    this.renderer.setClearColor(0xb7eeff);
    this.renderer.setPixelRatio(1.5);
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
      step: 0.15,
      intensity: 10,
      threshold: 0.05,
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
