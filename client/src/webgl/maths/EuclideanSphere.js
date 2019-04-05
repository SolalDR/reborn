import * as THREE from 'three';

/**
 * @class EuclideanSphere
 */
class EuclideanSphere {
  /**
   * Convert the geocoords in a cartesian repear
   * @param {{phi: float, theta: float}} param1
   * @param {float} radius
   * @param {THREE.Vector3} target
   * @returns {THREE.Vector3()}
   */
  static getCartesianCoords({
    phi = 0,
    theta = 0,
  } = {}, radius = 1, target = new THREE.Vector3()) {
    target.x = radius * Math.cos(phi) * Math.cos(theta);
    target.y = radius * Math.sin(phi);
    target.z = radius * Math.cos(phi) * Math.sin(theta);
    return target;
  }

  /**
   * Get spherical coord form a position
   * @param {THREE.Vector3} position The position you want to transform in spherical coord
   * @param {THREE.Vector3} center
   * @return {{phi: float, theta: float}}
   */
  static getEnclideanCoords(position, center = new THREE.Vector3()) {
    const diff = position.clone().sub(center);
    const radius = position.distanceTo(center);

    return {
      phi: Math.acos(diff.y / radius) - Math.PI / 2,
      theta: Math.atan(diff.x / diff.z) + Math.PI / 2,
    };
  }
}

export default EuclideanSphere;
