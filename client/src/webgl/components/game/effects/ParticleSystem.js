import vertexShader from './particles/particles.vert';
import fragmentShader from './particles/particles.frag';

export default class ParticleSystem {
  constructor(game, {
    count = 200,
  } = {}) {
    this.geometry = new THREE.BufferGeometry();
    const positionBuffer = new Float32Array(count * 3);
    const randomBuffer = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positionBuffer[i * 3] = Math.random() * 32 - 16;
      positionBuffer[i * 3 + 1] = Math.random() * 5;
      positionBuffer[i * 3 + 2] = Math.random() * 32 - 16;

      randomBuffer[i] = Math.random();
    }

    this.geometry.addAttribute('position', new THREE.BufferAttribute(positionBuffer, 3));
    this.geometry.addAttribute('random', new THREE.BufferAttribute(randomBuffer, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    this.mesh = new THREE.Points(this.geometry, this.material);
  }

  render() {
    this.mesh.material.uniforms.value += 0.1;
  }
}
