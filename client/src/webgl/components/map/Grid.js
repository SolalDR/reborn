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

  getCoord(index, destination = new THREE.Vector2()) {
    if (this[index] !== null) {
      destination.x = this[index].x - this.size[0] / 2 + 0.5;
      destination.y = this[index].y - this.size[1] / 2 + 0.5;
      return destination;
    }
    return null;
  }

  getCellsFromBox(box = this.box) {
    const distance = new THREE.Vector2().copy(box.max).sub(box.min).addScalar(1);
    var cells = [];
    for (let i = 0; i < distance.x; i++) {
      for (let j = 0; j < distance.y; j++) {
        cells.push(this.get({ x: box.min.x + i, y: box.min.y + j }))
      }
    }

    return cells;
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
    // La première ligne calcule les coordonnée minimum de la box,
    // Si la box est de taille impaire, il faut la recaler sur un bord de la grille
    //    Donc si l'intersection du point est plus sur la droite, on décale la box de 1 sinon on reste à gauche
    this.box.min.x = cell.x - Math.floor(scale.x / 2) + (
      xPeer && (point.x + this.size[0] / 2) % 1 > 0.5 ? 1 : 0
    );

    // Idem mais sur y
    this.box.min.y = cell.y - Math.floor(scale.y / 2) + (
      yPeer && (point.z + this.size[1] / 2) % 1 > 0.5 ? 1 : 0
    );

    this.box.max.x = this.box.min.x + scale.x - 1;
    this.box.max.y = this.box.min.y + scale.y - 1;

    const distance = new THREE.Vector2().copy(this.box.max).sub(this.box.min).addScalar(1);
    for (let i = 0; i < distance.x; i++) {
      for (let j = 0; j < distance.y; j++) {
        let currentCell = this.get({ x: this.box.min.x + i, y: this.box.min.y + j });
        if (currentCell === null || currentCell.reference !== null) {
          return false;
        }
      }
    }
    return true;
  }
}

export default Grid;
