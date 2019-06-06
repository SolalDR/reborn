class GridHelper extends THREE.Mesh {
  constructor({
    position = new THREE.Vector3(),
    size = new THREE.Vector2(32, 32),
  } = {}) {
    super(
      new THREE.CircleGeometry(0.5, 16),
      new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 1,
      }),
    );
    this.size = size;
    this.box = new THREE.Box2();

    this.position.copy(position);
    this.targetPosition = position.clone();
    this.rotation.x = -Math.PI / 2;
  }

  /**
   * Compute the position of the zonnig center, default position is attribute to gridHelper
   * @param {THREE.Vector2} cell The coordinates of the cell
   * @param {THREE.Vector2} point The coordinates you need to compute
   * @param {THREE.Vector2} position Target position
   */
  updatePosition(cell, point, position = this.targetPosition) {
    const x = !this.xPeer
      ? cell.x - this.size.x / 2 + 0.5
      : cell.x - this.size.x / 2 + (
        (point.x + this.size.x / 2) % 1 > 0.5 ? 1 : 0
      );

    const y = !this.yPeer
      ? cell.y - this.size.y / 2 + 0.5
      : cell.y - this.size.y / 2 + (
        (point.z + this.size.y / 2) % 1 > 0.5 ? 1 : 0
      );

    position.set(x, point.y + 0.11, y);
    this.position.y = point.y + 0.11;
  }


  setSize(x, y) {
    this.scale.x = x;
    this.scale.y = y;
    this.xPeer = this.scale.x % 2 === 0;
    this.yPeer = this.scale.y % 2 === 0;
  }

  render() {
    this.position.copy(this.position.clone()
      .add(this.targetPosition.clone()
        .sub(this.position)
        .multiplyScalar(0.3)));
  }
}

export default GridHelper;
