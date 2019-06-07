import vertexShader from './birds/birds.vert';
import fragmentShader from './birds/birds.frag';

export default class Birds {
  constructor({
    map = null,
    alphaMap = null,
  }) {
    const geometry = new THREE.PlaneGeometry(1, 1, 2);
    geometry.rotateX(Math.PI / 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          value: 0,
        },
        map: {
          value: map,
        },
        alphaMap: {
          value: alphaMap,
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 10, 0);
    console.log(this.mesh);

    this.lookTarget = new THREE.Vector3();
  }

  render() {
    this.mesh.material.uniforms.time.value += 0.1;
    const time = this.mesh.material.uniforms.time.value;

    this.mesh.position.set(
      Math.cos(time * 0.1) * 12,
      10,
      Math.sin(time * 0.1) * 12,
    );

    this.lookTarget.set(Math.cos(time * 0.1 + 0.26) * 12,
      10,
      Math.sin(time * 0.1 + 0.26) * 12);

    this.mesh.lookAt(this.lookTarget);

    this.mesh.rotateOnWorldAxis(
      this.lookTarget.clone().sub(this.mesh.position).normalize(),
      .6,
    );
  }
}
