import OrbitControls from './OrbitControls';
import RailsControl from './RailsControl';
import config from '../../config';

class Control {
  constructor({
    camera = null,
    scene = null,
    vue = null,
  } = {}) {
    this.configCamera = config.camera[vue.$context.device];
    if (!this.configCamera) {
      this.configCamera = config.camera.desktop;
    }

    this.orbit = new OrbitControls({
      object: camera,
      radius: this.configCamera.controls.orbit.radius.max,
      phi: this.configCamera.controls.orbit.phi,
      theta: this.configCamera.controls.orbit.theta,
      enabled: false,
      target: this.configCamera.carousel.lookAt,
    });

    this.rails = new RailsControl({
      object: camera,
    });

    this.mouse = vue.$mouse;
    this.bus = vue.$bus;
    this.camera = camera;
    this.state = {
      phi: this.orbit.phi,
      theta: this.orbit.theta,
    };

    // Desktop
    const device = vue.$context.getDevice().type;
    if (device !== 'mobile' && device !== 'tablet') {
      this.bus.$on('mouse:move', (mouse) => {
        this.state.theta = -mouse.xUnit * 0.08;
        this.state.phi = this.configCamera.controls.orbit.phi + mouse.yUnit * 0.08;
      });
      return;
    }

    // Mobile & tablet
    this.bus.$on('mouse:move', (mouse) => {
      this.state.theta = mouse.xDrag / window.innerWidth * 0.1;
    });

    this.bus.$on('touch:click', (mouse) => {
      setTimeout(() => {
        this.state.theta = 0;
        this.state.phi = this.configCamera.controls.orbit.phi;
      }, 500);
    });

    const orientation = new THREE.Vector2();
    window.addEventListener('deviceorientation', (event) => {
      orientation.set(
        event.gamma / 90,
        THREE.Math.clamp(event.beta, -90, 90) / 90,
      );

      this.state.theta = orientation.x * 0.13;
      this.state.phi = this.configCamera.controls.orbit.phi + orientation.y * 0.02;
    });
  }

  loop() {
    this.orbit.update();
    this.orbit.theta += (this.state.theta - this.orbit.theta) * this.configCamera.controls.paralax.speed;
    this.orbit.phi += (this.state.phi - this.orbit.phi) * this.configCamera.controls.paralax.speed;
  }

  initGui(cameraFolder) {
    cameraFolder.add(this.configCamera.controls.paralax, 'speed', 0, 0.2).name('Paralax Speed');
    this.orbit.initGui(cameraFolder);
  }
}

export { OrbitControls };
export default Control;
