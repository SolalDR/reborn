import Viewport from '../plugins/Viewport';
import GameMap from './components/GameMap';

export default class WebGL {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setClearColor(0xb7eeff);
    this.renderer.setSize(Viewport.width, Viewport.height);

    this.initScene();
    this.loop();
  }

  initEvents() {
    Viewport.$on('resize', () => {
      this.renderer.setSize(Viewport.width, Viewport.height);
    });
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xb7eeff, 20, 32);

    this.camera = new THREE.PerspectiveCamera(45, Viewport.width / Viewport.height, 1, 1000);
    const light = new THREE.PointLight();
    this.map = new GameMap();

    this.scene.add(light);
    this.scene.add(this.map);

    light.position.set(0, 5, 5);
    this.camera.position.set(0, 20, 20);
    this.camera.lookAt(new THREE.Vector3());
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
