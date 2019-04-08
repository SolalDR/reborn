class GridHelper extends THREE.Mesh {
  constructor({
    position = new THREE.Vector3(),
    cellSize = 1,
    size = new THREE.Vector2(32, 32),
  } = {}) {
    super(
      new THREE.PlaneGeometry(cellSize, cellSize),
      new THREE.MeshBasicMaterial({
        color: 0x00FF00,
      }),
    );
    this.size = size;
    this.cell = null;
    this.box = new THREE.Box2();

    this.position.copy(position);
    this.rotation.x = -Math.PI / 2;
  }

  updatePosition(cell, uv) {
    // Update cell
    this.cell = cell;

    // Compute position
    const x = !this.xPeer
      ? cell.x - this.size.x / 2 + 0.5
      : cell.x - this.size.x / 2 + (
        (uv.x * this.size.x) % 1 > 0.5 ? 1 : 0
      );

    const y = !this.yPeer
      ? -cell.y + this.size.y / 2 - 0.5
      : -cell.y + this.size.y / 2 + (
        (uv.y * this.size.y) % 1 > 0.5 ? -1 : 0
      );
    this.position.set(x, 1.05, y);

    // Compute bbox
    this.box.min.x = cell.x - Math.floor(this.scale.x / 2) - (
      this.xPeer && (uv.x * this.size.x) % 1 > 0.5 ? -1 : 0
    );
    this.box.min.y = cell.y - Math.floor(this.scale.y / 2) - (
      this.yPeer && (uv.y * this.size.y) % 1 > 0.5 ? 1 : 0
    );
    this.box.max.x = this.box.min.x + this.scale.x - 1;
    this.box.max.y = this.box.min.y + this.scale.y - 1;
  }


  setSize(x, y) {
    this.scale.x = x;
    this.scale.y = y;
    this.xPeer = this.scale.x % 2 === 0;
    this.yPeer = this.scale.y % 2 === 0;
  }
}

export default GridHelper;
