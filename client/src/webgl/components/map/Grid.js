import Reborn from '../../../game';

class Grid extends Reborn.Grid {
  constructor() {
    super();
    this.box = new THREE.Box2(
      new THREE.Vector2(0, 0),
      new THREE.Vector2(31, 31),
    );
  }

  register(i, value) {
    super.register(i, value);
  }

  checkIntersection(bbox) {
    if (!this.box.containsBox(bbox)) return false;
    return true;
  }

  /**
   * @param {THREE.Vector2} point Coordonninate in the world
   * @param {THREE.Vector2} destination Destination
   * @return {THREE.Vector2} Return the coordinates in the grid
   */
  getCell(point, destination = new THREE.Vector2()) {
    destination.x = Math.floor(point.x + this.size[0] / 2);
    destination.y = Math.floor(point.z + this.size[1] / 2);
    return destination;
  }

  /**
   * @param {THREE.Vector3} point The intersection point
   * @param {THREE.Vector2} scale The size to check
   */
  checkSpace(point, scale) {
    const cell = this.getCell(point);
    const xPeer = scale.x % 2 === 0;
    const yPeer = scale.y % 2 === 0;

    // Compute bbox
    this.box.min.x = cell.x - Math.floor(scale.x / 2) + (
      xPeer && (point.x + this.size[0] / 2) % 1 > 0.5 ? 1 : 0
    );

    this.box.min.y = cell.y - Math.floor(scale.y / 2) + (
      yPeer && (point.z + this.size[1] / 2) % 1 > 0.5 ? 1 : 0
    );

    this.box.max.x = this.box.min.x + scale.x - 1;
    this.box.max.y = this.box.min.y + scale.y - 1;

    const distance = new THREE.Vector2().copy(this.box.max).sub(this.box.min).addScalar(1);

    for (let i = 0; i < distance.x; i++) {
      for (let j = 0; j < distance.y; j++) {
        if (!this.get({ x: this.box.min.x + i, y: this.box.min.y + j })) {
          return false;
        }
      }
    }
    return true;
  }
}

export default Grid;
