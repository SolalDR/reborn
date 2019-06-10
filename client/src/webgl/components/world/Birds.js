import vertexShader from './birds/birds.vert';
import fragmentShader from './birds/birds.frag';
import Simplex from 'simplex-noise';
import animate from '@solaldr/animate';
import mouse from '@/plugins/Mouse';

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

    this.initBoundingBoxe();
    this.initGroup();
    mouse.$on('click', this.onMouseClick);
  }

  initBoundingBoxe = () => {
    this.boundingBoxexGroup = new THREE.Group();

    for (let i = 0; i < this.total; i++) {
      const boundingBoxGeometry = new THREE.SphereGeometry(this.size * 1.3);
      const boundingBoxMaterial = new THREE.MeshBasicMaterial({
        color: '#FFF',
      });

      const boundingBox = new THREE.Mesh(boundingBoxGeometry, boundingBoxMaterial);
      boundingBox.position.set(0, 10, 0);
      boundingBox.index = i;

      this.boundingBoxexGroup.add(boundingBox);
    }
  }

  initGroup = () => {
    this.meshesGroup = new THREE.Group();

    for (let i = 0; i < this.total; i++) {
      const geometry = new THREE.PlaneGeometry(this.size, this.size, 2);
      geometry.rotateX(Math.PI / 2);

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: {
            value: 0,
          },
          map: {
            value: this.map,
          },
          alphaMap: {
            value: this.alphaMap,
          },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 10, 0);

      this.meshesGroup.add(mesh);
    }
  }

  onMouseClick = ({ event }) => {
    if (event.target !== this.webgl.canvas) return;
    this.raycaster.setFromCamera(mouse.normalized, this.webgl.camera);
    const intersects = this.raycaster.intersectObjects(this.boundingBoxexGroup.children);

    if (intersects[0]) this.shoot(intersects[0]);
  }

  /**
   * @todo Play sound
   */
  shoot(intersection) {
    const intersectedMesh = this.meshesGroup.children[intersection.object.index];
    intersectedMesh.shooted = true;
    console.log(intersectedMesh);

    const from = intersectedMesh.position.clone();
    const target = this.lookTarget.clone().sub(from).multiplyScalar(1).add(from);
    target.y = -1;

    animate.add({
      duration: 1000,
      timingFunction: 'easeInQuad',
    }).on('progress', ({ value }) => {
      intersectedMesh.position.copy(
        from.clone().add(target.clone().sub(from).multiplyScalar(value)),
      );
      intersectedMesh.rotation.x += 0.05;
    });

    setTimeout(() => {
      this.webgl.explosionEffect.mesh.position.set(target.x, 0.1, target.z);
      this.webgl.explosionEffect.explode({
        duration: 1500,
      });

      this.boundingBoxexGroup.children.splice(intersection.object.index, 0);
      intersectedMesh.visible = false;
    }, 800);
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
    for (let i = 0; i < this.meshesGroup.children.length; i++) {
      const mesh = this.meshesGroup.children[i];
      console.log(mesh);
      if (mesh.shooted) continue;
      const boundingBoxe = this.boundingBoxexGroup.children[i];

      mesh.material.uniforms.time.value += 0.1;
      const time = mesh.material.uniforms.time.value;

      this.computePositionAt(i + time * 0.1, mesh.position);
      this.computePositionAt(i + time * 0.1 + 0.26, this.lookTarget);
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
