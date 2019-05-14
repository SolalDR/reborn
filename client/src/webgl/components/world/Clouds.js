import LineSystem from '../line/LineSystem';

export default class Clouds {
  constructor({
    path = null,
    brush = null,
  } = {}) {
    this.geometry = new THREE.Geometry();
    this.path = path;
    this.path.currentPath.getPoints(100).forEach((point, i) => {
      this.geometry.vertices.push(
        new THREE.Vector3(point.x, -point.y, Math.cos(i / 200) * 3)
          .multiplyScalar(0.5),
      );
    });

    this.cluster = new LineSystem(this.geometry, {
      map: brush,
    });

    this.cluster.mesh.position.y = 20;

    for (let i = 0; i < 100; i++) {
      this.cluster.addItem({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          0,
          (Math.random() - 0.5) * 10,
        ),
        rotation: new THREE.Euler(
          Math.random() * 2 * Math.PI,
          Math.random() * 2 * Math.PI,
          Math.random() * 2 * Math.PI,
        ),
        dashOffset: Math.random() * 2,
      });
    }
  }
}
