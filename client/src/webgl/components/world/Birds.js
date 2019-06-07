import vertexShader from './birds/birds.vert';
import fragmentShader from './birds/birds.frag';
import Simplex from 'simplex-noise';

export default class Birds {
  constructor({
    map = null,
    alphaMap = null,
  }) {
    this.noise = new Simplex();
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

    this.mesh = new THREE.Group();

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 10, 0);
    console.log(this.mesh);

    this.lookTarget = new THREE.Vector3();
  }

  computePositionAt(value, destination = new THREE.Vector3()) {
    destination.set(
      Math.cos(value) * (12 - this.noise.noise2D(value * 0.5, 0.1) * 2),
      10 + this.noise.noise2D(value * 0.5, 0.3) * 2,
      Math.sin(value) * (12 - this.noise.noise2D(value * 0.5, 0.5) * 2),
    );
    return destination;
  }

  render() {
    this.mesh.material.uniforms.time.value += 0.1;
    const time = this.mesh.material.uniforms.time.value;

    this.computePositionAt(time * 0.1, this.mesh.position);
    this.computePositionAt(time * 0.1 + 0.26, this.lookTarget);

    this.mesh.lookAt(this.lookTarget);

    this.mesh.rotateOnWorldAxis(
      this.lookTarget.clone().sub(this.mesh.position).normalize(),
      .6,
    );
  }
}
