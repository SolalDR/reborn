import OrbitControls from './OrbitControls';
import RailsControl from './RailsControl';
import bus from '../../plugins/Bus';
import mouse from '../../plugins/Mouse';
import Viewport from '../../plugins/Viewport';

class Control {
  constructor({
    camera = null,
  } = {}) {
    this.orbit = new OrbitControls({
      object: camera,
      radius: 12,
      enabled: true,
      look: new THREE.Vector3(),
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

    let phi = 0;
    let theta = 0;

    this.mouse.$on('dragstart', () => {
      phi = this.state.phi;
      theta = this.state.theta;
    });

    this.mouse.$on('dragmove', (e) => {
      this.state.theta = theta - (e.delta.x / Viewport.height) * 5.0;
      this.state.phi = phi - (e.delta.y / Viewport.width) * 5.0;
    });

    let wheel = 5;
    this.mouse.$on('wheel', ({ event }) => {
      wheel += event.deltaY / 100;
      this.orbit.radius = Math.max(5, wheel);
    });
  }

  loop() {
    this.orbit.update();
    this.orbit.theta += (this.state.theta - this.orbit.theta) * 0.1;
    this.orbit.phi += (this.state.phi - this.orbit.phi) * 0.1;
  }
}

export { OrbitControls };
export default Control;
