import Cluster from '../cluster';

export default class EntityModelGroup {
  constructor(name, {
    geometry = null,
    material = null,
    slot = null,
  } = {}) {
    this.geometry = geometry;
    this.material = material;
    this.slot = slot;

    const hiddenLocation = new THREE.Vector3(0, 200, 0);

    this.entityCluster = new Cluster(geometry, material, {
      hiddenLocation,
    });

    this.pickingCluster = new Cluster(geometry, material, {
      hiddenLocation,
      picking: true,
    });
  }

  addItem({
    position = null,
    rotation = null,
  } = {}) {
    if (!position || !rotation) return;

    const index = this.entityCluster.addItem({ position, rotation });

    const pickingColor = new THREE.Vector3(
      this.slot / 256,
      Math.floor(index / 256) / 256,
      (index % 256) / 256,
    );

    this.pickingCluster.addItem({
      position,
      rotation,
      pickingColor,
      index,
    });
  }

  removeItem(id) {

  }
}
