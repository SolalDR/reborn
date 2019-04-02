import Viewport from '../plugins/Viewport';

export default class WebGL {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
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
    this.camera = new THREE.PerspectiveCamera(45, Viewport.width / Viewport.height, 1, 1000);
    const light = new THREE.PointLight();
    this.cube = new THREE.Mesh(
      new THREE.CubeGeometry(),
      new THREE.MeshPhongMaterial({
        color: 0xFF0000,
      }),
    );

    this.scene.add(light);
    this.scene.add(this.cube);

    light.position.set(0, 5, 5);
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(new THREE.Vector3());
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}
