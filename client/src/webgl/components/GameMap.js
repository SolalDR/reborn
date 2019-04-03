export default class GameMap extends THREE.Group {
  constructor() {
    super();
    this.initFloor();
    this.initWater();

    this.add(this.floor);
    this.add(this.water);
  }

  initFloor() {
    const geometry = new THREE.PlaneGeometry(32, 32, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: 0x614125,
    });

    geometry.rotateX(-Math.PI / 2);
    this.floor = new THREE.Mesh(geometry, material);
  }

  initWater() {
    const geometry = new THREE.PlaneGeometry(32, 32, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: 0x2aa8b9,
    });

    geometry.rotateX(-Math.PI / 2);
    this.water = new THREE.Mesh(geometry, material);
  }
}
