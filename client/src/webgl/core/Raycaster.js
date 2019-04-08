import Emitter from '@solaldr/emitter';
import mouse from '../../plugins/Mouse';
import Bus from '../../plugins/Bus';

const raycaster = new THREE.Raycaster();

class Raycaster extends Emitter {
  constructor({
    scene,
    camera,
    object = null,
  } = {}) {
    super();
    this.object = object;
    this.scene = scene;
    this.camera = camera;
    this.intersections = [];

    mouse.$on('move', () => {
      if (this.object) {
        raycaster.setFromCamera(mouse.normalized, this.camera);
        const a = raycaster.intersectObject(this.object, false);
        if (a.length) {
          this.emit('cast', a[0]);
          Bus.$emit('cast', a[0]);
        }
      }
    });
  }
}

export default Raycaster;
