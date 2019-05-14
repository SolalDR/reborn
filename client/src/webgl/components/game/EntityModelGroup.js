import Cluster from '../cluster';
import animate from '@solaldr/animate';

export default class EntityModelGroup {
  constructor(name, {
    geometry = null,
    material = null,
    slot = null,
  } = {}) {
    this.name = name;
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
    uuid = null,
  } = {}) {
    if (!position || !rotation) return;

    var scale = new THREE.Vector3();
    const index = this.entityCluster.addItem({
      position,
      rotation,
      uuid,
      scale,
    });

    const pickingColor = new THREE.Vector3(
      this.slot / 256,
      Math.floor(index / 256) / 256,
      (index % 256) / 256,
    );

    var baseHeight = position.y;
    animate.add({
      duration: 400,
      timingFunction: "easeInOutBack",
    }).on('progress', ({ value, advancement }) => {
      var h = baseHeight + 2 - advancement * 2;
      this.entityCluster.setPositionAt(index, new THREE.Vector3(position.x, h, position.z));
      this.entityCluster.geometry.attributes.instancePosition.needsUpdate = true;

      this.entityCluster.setScaleAt(index, scale.set(value, value, value))
      this.entityCluster.geometry.attributes.instanceScale.needsUpdate = true;
    })

    this.pickingCluster.addItem({ position, rotation, pickingColor, index, uuid });
  }

  getItem(index) {
    return {
      model: this.name,
      ...this.entityCluster.getItem(index)
    }
  }

  getEntity(uuid) {
    return this.entityCluster.getItem(this.entityCluster.getIndex(uuid))
  }

  removeItem(index) {
    var scaleFrom = this.entityCluster.getScaleAt(index);
    var scale = new THREE.Vector3();

    animate.add({
      duration: 400,
      timingFunction: "easeInOutBack",
    }).on('progress', ({ value, advancement }) => {
      this.entityCluster.setScaleAt(index, scale.set(
        scaleFrom.x - scaleFrom.x * value,
        scaleFrom.y - scaleFrom.y * value,
        scaleFrom.z - scaleFrom.z * value
      ));
      this.entityCluster.geometry.attributes.instanceScale.needsUpdate = true;
    }).on('end', () => {
      this.entityCluster.removeItem(index);
    })

    this.pickingCluster.removeItem(index);

  }

  removeEntity(uuid) {
    return this.removeItem(this.entityCluster.getIndex(uuid));
  }
}
