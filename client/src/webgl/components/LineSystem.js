import { MeshLine, MeshLineMaterial } from './meshline';

export default class LineSystem {
  constructor(points, texture) {
    const geometry = new THREE.Geometry();
    points.forEach((point, i) => {
      geometry.vertices.push(new THREE.Vector3(point.x, -point.y, Math.cos(i/200)*3));
    });

    const line = new MeshLine();

    this.material = new MeshLineMaterial({
      color: new THREE.Color(0x000000),
      map: texture,
      useMap: true,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      sizeAttenuation: false,
      lineWidth: 10,

      near: 0.1,
      far: 1000,

      depthWrite: false,
      depthTest: false,
      alphaTest: 0.5,

      dashArray: 2,
      dashOffset: 0,
      dashRatio: 0.80,

      transparent: true,
      opacity: 1,

      side: THREE.DoubleSide,
    });

    this.material.onBeforeCompile = (program) => {
      console.log(program);
    };

    this.mesh = new THREE.Mesh(line.geometry, this.material);
  }

  loop() {
    this.mesh.material.uniforms.dashOffset.value += 0.01;
  }
}
