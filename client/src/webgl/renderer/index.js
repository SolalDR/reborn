
import {
  EffectComposer, EffectPass, RenderPass, BloomEffect,
} from 'postprocessing';
import Dat from 'dat.gui';
import Viewport from '../../plugins/Viewport';
import SobelEffect from './effects/SobelEffect';
import FilmEffect from './effects/FilmEffect';

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
    this.gui = new Dat.GUI();
    this.initRenderer();
    this.initComposer();
    this.initEvents();
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

  initComposer() {
    this.composer = new EffectComposer(this.renderer);
    this.sobelEffect = new SobelEffect({
      step: 0.6,
      intensity: 10,
      threshold: 0.3,
    });

    this.filmEffect = new FilmEffect();
    this.bloomEffect = new BloomEffect();

    this.gui.add(this.sobelEffect.uniforms.get('step'), 'value').name('Step');
    this.gui.add(this.sobelEffect.uniforms.get('intensity'), 'value').name('Intensity');
    this.gui.add(this.sobelEffect.uniforms.get('threshold'), 'value').name('threshold');
    const effectPass = new EffectPass(this.camera, this.filmEffect, this.bloomEffect, this.sobelEffect);


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
}
