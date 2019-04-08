class GridHelper extends THREE.Mesh {
  constructor({
    position = new THREE.Vector3(),
  } = {}) {
    super(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x00FF00,
      }),
    );
    this.rotation.x = -Math.PI / 2;
    this.position.copy(position);
  }

  setSize(x, y) {
    this.scale.x = x;
    this.scale.y = y;
  }
}

export default GridHelper;
