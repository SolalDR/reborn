import * as THREE from 'three';
import Emitter from '@solaldr/emitter';
import animate from '@solaldr/animate';

window.THREE = THREE;
/**
 * @class
 * Radial control can rotate arround a point based on radial coord.
 * The coords are just like geo coords but defining between
 * [-π;π] for theta (azimuth) & [-π/2, π/2] for phi (elevation)
 */
class RailsControl extends Emitter {
  constructor({
    object = null,
  } = {}) {
    super();
    this.object = object;
    this.config = {
      animation: {
        duration: 1000,
        timingFunction: 'easeInOutQuad',
      },
    };

    this.state = {
      moveData: null,
      lookData: null,
    };
  }

  /**
   * Return true if an anim is currently played
   * @returns {boolean}
   */
  get isActive() {
    return this.state.moveData !== null || this.state.lookData !== null;
  }

  /**
   * Get the position the camera is looking at a given distance
   * @param {float} distance
   */
  getComputedTarget(distance = 1) {
    return new THREE.Vector3(0, 0, -1)
      .applyQuaternion(this.object.quaternion)
      .multiplyScalar(distance)
      .add(this.object.position);
  }

  /**
   * Move the camera to a certain point
   * @param {THREE.Vector3} target
   * @param {{speed: {int}, timingFunction: {string}}} arguments
   * @returns {Animation}
   */
  moveTo(target = new THREE.Vector3(), {
    duration = this.config.animation.duration,
    timingFunction = this.config.animation.timingFunction,
  } = {}) {
    // Init
    const from = this.object.position.clone();
    const to = target.clone();
    const diff = to.clone().sub(from);

    // Test if it's a useless anim
    if (from.equals(to)) return null;

    // Register animation globally
    const a = animate.add({
      duration,
      timingFunction,
    }).on('progress', ({ value }) => {
      this.object.position.copy(
        from.clone().add(diff.clone().multiplyScalar(value)),
      );
    }).on('end', () => {
      this.emit('end:move', a);
    });

    return a;
  }

  /**
   * Launch a smooth look animation
   * @param {THREE.Vector3} target
   * @param {{timingFunction: {string}, duration: {int}}} arguments
   * @returns {Animation}
   */
  lookTo(target, {
    duration = this.config.animation.duration,
    timingFunction = this.config.animation.timingFunction,
  } = {}) {
    // Init
    const distance = this.object.position.distanceTo(target);
    const from = this.getComputedTarget(distance);
    const to = target.clone();
    const diff = to.clone().sub(from);

    // Test if it's a useless anim
    if (from.clone().normalize().equals(to.clone().normalize())) return null;

    // Register animation globally
    const a = animate.add({
      duration,
      timingFunction,
    }).on('progress', ({ value }) => {
      this.object.lookAt(from.clone().add(diff.clone().multiplyScalar(value)));
    }).on('end', () => {
      this.emit('end:look', a);
    });

    return a;
  }
}

export default RailsControl;
