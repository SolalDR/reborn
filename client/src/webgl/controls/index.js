import config from '@/config/controls';
import GUI from '@/plugins/GUI';
import OrbitControls from './OrbitControls';
import RailsControl from './RailsControl';
import bus from '../../plugins/Bus';
import mouse from '../../plugins/Mouse';
import Viewport from '../../plugins/Viewport';
import animate from '@solaldr/animate';

class Control {
  constructor({
    camera = null,
  } = {}) {
    this.orbit = new OrbitControls({
      object: camera,
      enabled: true,
      look: new THREE.Vector3(),
      radius: config.camera.radius.startAt,
      phi: config.camera.phi.startAt,
      theta: config.camera.theta.startAt,
    });

    this.rails = new RailsControl({
      object: camera,
    });

    this.mouse = mouse;
    this.bus = bus;
    this.camera = camera;
    this.state = {
      phi: this.orbit.phi,
      theta: this.orbit.theta,
    };

    this.initDragEvent();
    this.initWheelEvent();
    this.initGUI();
  }

  initDragEvent() {
    let phi = 0;
    let theta = 0;
    this.mouse.$on('dragstart', () => {
      phi = this.state.phi;
      theta = this.state.theta;
    });

    this.mouse.$on('dragmove', (e) => {
      this.state.theta = theta - (e.delta.x / Viewport.height) * 5.0;
      this.state.phi = Math.min(
        config.camera.phi.max,
        Math.max(
          phi - (e.delta.y / Viewport.width) * 5.0,
          config.camera.phi.min,
        ),
      );
    });
  }

  initWheelEvent() {
    let wheel = config.camera.radius.startAt;
    this.mouse.$on('wheel', ({ event }) => {
      wheel += event.deltaY / 100;
      wheel = Math.min(
        config.camera.radius.max,
        Math.max(
          wheel,
          config.camera.radius.min,
        ),
      );
      this.orbit.radius = wheel;
    });
  }

  woobleAction({
    count = 110,
    speed = 60,
    intensity = 0.03,
    timingFunction = 'linear',
  } = {}) {
    const duration = speed * count;
    animate.add({ duration, timingFunction }).on('progress', (event) => {
      const rotation = Math.sin((event.value * Math.PI * 2) * count) * intensity;
      this.orbit.axeRotation = rotation;
    });
  }

  loop() {
    this.orbit.update();
    const thetaDelta = (this.state.theta - this.orbit.theta) * 0.1;
    this.orbit.axeRotation = Math.max(Math.min(0.15, thetaDelta * 0.5), -0.15);
    this.orbit.theta += thetaDelta;
    this.orbit.phi += (this.state.phi - this.orbit.phi) * 0.1;
  }

  initGUI() {
    const phiFolder = GUI.controls.addFolder('phi');
    phiFolder.add(config.camera.phi, 'max', 0, Math.PI / 2);
    phiFolder.add(config.camera.phi, 'min', 0, Math.PI / 2);

    const radiusFolder = GUI.controls.addFolder('radius');
    radiusFolder.add(config.camera.radius, 'max', 1, 100);
    radiusFolder.add(config.camera.radius, 'min', 1, 32);

    GUI.scene.addCamera('Camera', this.camera);
  }
}

export { OrbitControls };
export default Control;
