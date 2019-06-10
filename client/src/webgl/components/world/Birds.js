import vertexShader from './birds/birds.vert';
import fragmentShader from './birds/birds.frag';
import Simplex from 'simplex-noise';
import animate from '@solaldr/animate';
import mouse from '@/plugins/Mouse';
import SoundManager from '@/plugins/Sound';

export default class Birds {
  constructor({
    webgl = null,
    map = null,
    alphaMap = null,
    total = 12,
    size = 0.4,
  }) {
    this.webgl = webgl;
    this.map = map;
    this.alphaMap = alphaMap;
    this.total = total;
    this.size = size;
    this.noise = new Simplex();
    this.lookTarget = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();

    this.initGroup();
    mouse.$on('click', this.onMouseClick);
  }


  initGroup = () => {
    this.meshesGroup = new THREE.Group();
    this.boundingBoxes = [];
    this.boundingBoxesIntersected = [];

    const boundingBoxGeometry = new THREE.SphereGeometry(this.size * 1.45);
    const boundingBoxMaterial = new THREE.MeshBasicMaterial();

    const geometry = new THREE.PlaneGeometry(this.size, this.size, 2);
    geometry.rotateX(Math.PI / 2);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        map: { value: this.map },
        alphaMap: { value: this.alphaMap },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < this.total; i++) {
      const boundingBox = new THREE.Mesh(boundingBoxGeometry, boundingBoxMaterial);
      boundingBox.rank = i;

      const mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.set(0, 10, 0);
      mesh.rank = i;

      this.boundingBoxes.push(boundingBox);
      this.boundingBoxesIntersected.push(boundingBox);
      this.meshesGroup.add(mesh);
    }
  }

  onMouseClick = ({ event }) => {
    if (event.target !== this.webgl.canvas) return;
    this.raycaster.setFromCamera(mouse.normalized, this.webgl.camera);
    const intersects = this.raycaster.intersectObjects(this.boundingBoxesIntersected);

    if (intersects[0]) this.shoot(intersects[0]);
  }

  shoot(intersection) {
    const intersectedMesh = this.meshesGroup.children[intersection.object.rank];
    intersectedMesh.shooted = true;

    const from = intersectedMesh.position.clone();

    const time = intersectedMesh.material.uniforms.time.value;
    this.computePositionAt(intersectedMesh.rank + time * 0.1 + 0.26, this.lookTarget);
    const target = this.lookTarget.clone().sub(from).multiplyScalar(1).add(from);
    target.y = -1;

    // TODO: PLay Sound
    SoundManager.play('bird_shoot');

    animate.add({
      duration: 1000,
      timingFunction: 'easeInQuad',
    }).on('progress', ({ value }) => {
      intersectedMesh.position.copy(
        from.clone().add(target.clone().sub(from).multiplyScalar(value)),
      );
      intersectedMesh.rotation.x += 0.05;
    }).on('end', () => {
      this.webgl.explosionEffect.mesh.position.set(target.x, 0.1, target.z);
      this.webgl.explosionEffect.explode({
        duration: 1500,
      });

      this.boundingBoxesIntersected.splice(intersection.object.rank, 0);
      intersectedMesh.visible = false;
    });
  }

  computePositionAt(value, destination = new THREE.Vector3()) {
    destination.set(
      Math.cos(value) * (14 + this.noise.noise2D(value * 0.5, 0.1) * 2),
      10 + this.noise.noise2D(value * 0.5, 0.3) * 2,
      Math.sin(value) * (14 + this.noise.noise2D(value * 0.5, 0.5) * 2),
    );
    return destination;
  }

  render() {
    this.material.uniforms.time.value += 0.1;
    const time = this.material.uniforms.time.value;

    for (let i = 0; i < this.meshesGroup.children.length; i++) {
      const mesh = this.meshesGroup.children[i];
      if (mesh.shooted) continue;
      const boundingBoxe = this.boundingBoxes[mesh.rank];

      this.computePositionAt(mesh.rank + time * 0.1, mesh.position);
      this.computePositionAt(mesh.rank + time * 0.1 + 0.26, this.lookTarget);
      mesh.lookAt(this.lookTarget);

      boundingBoxe.matrixWorld.copy(mesh.matrixWorld);
      boundingBoxe.modelViewMatrix.copy(mesh.modelViewMatrix);

      mesh.rotateOnWorldAxis(
        this.lookTarget.clone().sub(mesh.position).normalize(),
        0.6,
      );
    }
  }
}
