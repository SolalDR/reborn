import Viewport from '../plugins/Viewport';
import GameMap from './components/GameMap';
import Controls from './controls';

export default class WebGL {
  constructor(canvas) {
    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(45, Viewport.width / Viewport.height, 1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setClearColor(0xb7eeff);
    this.renderer.setSize(Viewport.width, Viewport.height);
    this.controls = new Controls({
      camera: this.camera,
    });

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
    this.scene.fog = new THREE.Fog(0xb7eeff, 40, 50);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this.scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    this.scene.add(light);

    this.map = new GameMap();
    this.scene.add(this.map);

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshPhongMaterial(),
    );

    this.scene.add(cube);

    light.position.set(100, 100, 100);
    this.camera.position.set(0, 20, 20);
    this.camera.lookAt(new THREE.Vector3());
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.controls.loop();
    this.renderer.render(this.scene, this.camera);
  }
}
