
import {
  EffectComposer, EffectPass, RenderPass,
} from 'postprocessing';
import Dat from 'dat.gui';
import Viewport from '../../plugins/Viewport';
import SobelEffect from './effects/SobelEffect';

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
    this.renderer.setSize(Viewport.width, Viewport.height);
  }

  initComposer() {
    this.composer = new EffectComposer(this.renderer);
    const effect = new SobelEffect({
      step: 0.6,
      intensity: 10,
      threshold: 0.3,
    });
    this.gui.add(effect.uniforms.get('step'), 'value').name('Step');
    this.gui.add(effect.uniforms.get('intensity'), 'value').name('Intensity');
    this.gui.add(effect.uniforms.get('threshold'), 'value').name('threshold');
    const effectPass = new EffectPass(this.camera, effect);

    effectPass.dithering = true;
    effectPass.renderToScreen = true;

    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(effectPass);

    setTimeout(() => {
      console.log(effectPass.getDepthTexture());
    }, 1000);
  }

  initEvents() {
    Viewport.$on('resize', () => {
      this.renderer.setSize(Viewport.width, Viewport.height);
      this.composer.setSize(Viewport.width, Viewport.height);
    });
  }

  render() {
    this.composer.render(this.clock.getDelta());
  }
}
