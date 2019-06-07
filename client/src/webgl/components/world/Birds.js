import vertexShader from './birds/birds.vert';
import fragmentShader from './birds/birds.frag';
import Simplex from 'simplex-noise';
import animate from '@solaldr/animate';

export default class Birds {
  constructor({
    webgl = null,
    map = null,
    alphaMap = null,
  }) {
    this.webgl = webgl;
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
    console.log(this);
  }

  computePositionAt(value, destination = new THREE.Vector3()) {
    destination.set(
      Math.cos(value) * (14 + this.noise.noise2D(value * 0.5, 0.1) * 2),
      10 + this.noise.noise2D(value * 0.5, 0.3) * 2,
      Math.sin(value) * (14 + this.noise.noise2D(value * 0.5, 0.5) * 2),
    );
    return destination;
  }

  /**
   * @todo Play sound
   */
  shoot() {
    this.mesh.shooted = true;
    const from = this.mesh.position.clone();
    const target = this.lookTarget.clone().sub(from).multiplyScalar(1).add(from);
    target.y = -1;

    animate.add({
      duration: 1000,
      timingFunction: 'easeInQuad',
    }).on('progress', ({ value }) => {
      this.mesh.position.copy(
        from.clone().add(target.clone().sub(from).multiplyScalar(value)),
      );
      this.mesh.rotation.x += 0.05;
    });

    setTimeout(() => {
      this.webgl.explosionEffect.mesh.position.set(target.x, 0.1, target.z);
      this.webgl.explosionEffect.explode({
        duration: 1500,
      });
    }, 800);
  }

  render() {

    this.mesh.material.uniforms.time.value += 0.1;
    const time = this.mesh.material.uniforms.time.value;

    if (this.mesh.shooted) return;

    this.computePositionAt(time * 0.1, this.mesh.position);
    this.computePositionAt(time * 0.1 + 0.26, this.lookTarget);

    this.mesh.lookAt(this.lookTarget);

    this.mesh.rotateOnWorldAxis(
      this.lookTarget.clone().sub(this.mesh.position).normalize(),
      .6,
    );
  }
}
