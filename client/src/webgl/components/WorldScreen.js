import Emitter from '@solaldr/emitter';
import Viewport from '@/plugins/Viewport';

const vector = new THREE.Vector3();
export default class WorldScreen extends Emitter {
  constructor({
    camera = null
  } = {}) {
    super();
    this.camera = camera;
    this.elements = new Map();
  }

  add(uuid, position, callback) {
    this.elements.set(uuid, {
      position,
      callback,
    });
  }

  remove(uuid) {
    this.elements.delete(uuid);
  }

  render() {
    this.elements.forEach(element => {
      vector.copy(element.position).project(this.camera);
      element.callback(
        Math.floor((vector.x + 0.5) * Viewport.width),
        Math.floor((1 - (vector.y + 0.5)) * Viewport.height)
      );
    })
  }
}
