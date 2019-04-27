import Reborn from '../../../game';

class Grid extends Reborn.Grid {
  constructor() {
    super();

    this.box = new THREE.Box2(
      new THREE.Vector2(0, 0),
      new THREE.Vector2(31, 31),
    );
  }

  checkIntersection(bbox) {
    if (!this.box.containsBox(bbox)) return false;
    return true;
  }

  getCell(point, destination = new THREE.Vector2()) {
    destination.x = Math.floor(point.x + this.size[0] / 2);
    destination.y = Math.floor(point.z + this.size[1] / 2);
    return destination;
  }

  checkSpace(min, max = null) {
    const distance = new THREE.Vector2().copy(max).sub(min);

    // console.log(this);
    for (let i = 0; i < distance.x; i++) {
      for (let j = 0; j < distance.y; j++) {
        if (!this.get(min.x, min.y)) {
          return false;
        }
      }
    }
    return true;
  }
}

export default Grid;
