import * as THREE from 'three';
import EuclideanSphere from '../maths/EuclideanSphere';

/**
 * @author solaldr
 * @param
 */
class OrbitControls {
  constructor({
    enabled = true,
    object = null,
    target = new THREE.Vector3(),
    phi = 0,
    theta = 0,
    radius = null,
    look = null,
  } = {}) {
    this.object = object;
    this.enabled = enabled;
    this.target = target;
    this.look = look || this.target;
    this.phi = phi;
    this.theta = theta;
    this.radius = radius;
    this.axeRotation = 0;
    this.computePosition();
    this.object.lookAt(this.look);
  }

  computePosition() {
    EuclideanSphere.getCartesianCoords({
      phi: this.phi,
      theta: this.theta,
    }, this.radius, this.object.position);
    this.object.position.sub(this.target);
  }

  computeDirection() {
    this.direction.x = this.object.position.x + 0.5 * Math.sin(this.phi) * Math.cos(this.theta);
    this.direction.y = this.object.position.y + 0.5 * Math.cos(this.phi);
    this.direction.z = this.object.position.z + 0.5 * Math.sin(this.phi) * Math.sin(this.theta);
  }

  computeZoom() {
    this.object.position.copy(
      this.object.position
        .sub(this.target)
        .normalize()
        .multiplyScalar(this.radius),
    );
  }

  computeRadius() {
    this.radius = this.object.position.distanceTo(this.target);
  }

  update() {
    if (this.enabled) {
      this.computePosition();
      this.object.lookAt(this.look);
      this.object.rotateOnWorldAxis(
        this.target.clone()
          .sub(this.object.position)
          .normalize(),
        this.axeRotation,
      );
    }
  }
}

export default OrbitControls;
