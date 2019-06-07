import animate from '@solaldr/animate';
import Cluster from '../cluster';
import GUI from '@/plugins/GUI';
import modelsConfig from '@/config/models';

export default class EntityModelGroup {
  constructor(name, {
    geometry = null,
    material = null,
    slot = null,
  } = {}) {
    this.name = name;
    this.material = material;
    this.slot = slot;

    // Prepare geometry
    this.geometry = geometry;
    this.geometry.computeBoundingBox();
    this.geometry.computeFaceNormals();
    this.geometry.computeVertexNormals();

    // Compute bounding box size
    const boxSize = new THREE.Vector3()
      .copy(this.geometry.boundingBox.max)
      .sub(this.geometry.boundingBox.min);

    // Create picking geometry from bounding box
    this.pickingGeometry = new THREE.BoxBufferGeometry(boxSize.x, boxSize.y, boxSize.z);
    this.pickingGeometry.translate(0, boxSize.y / 2, 0);
    const hiddenLocation = new THREE.Vector3(0, 200, 0);

    // Create clusters
    this.entityCluster = new Cluster(this.geometry, material, {
      hiddenLocation,
    });
    this.pickingCluster = new Cluster(this.pickingGeometry, material, {
      hiddenLocation,
      picking: true,
    });

    // Enable GUI on the model
    GUI.world.addMaterial(this.name, this.entityCluster.material);

    // Custom material edition
    if (modelsConfig.materials[this.name]) {
      Object.keys(modelsConfig.materials[this.name]).forEach((key) => {
        this.entityCluster.material[key] = modelsConfig.materials[this.name][key];
      });
    }
  }

  /**
   * Add a new item in the model collection
   * @param {THREE.Vector2} object.position
   * @param {Number} object.rotation
   * @param {String} object.uuid
   */
  addItem({
    position = null,
    rotation = null,
    uuid = null,
  } = {}) {
    if (!position || !rotation) return;
    const duration = 400;
    const scale = new THREE.Vector3();
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

    // Wait before make the item pickable
    setTimeout(() => {
      this.pickingCluster.addItem({
        position, rotation, pickingColor, index, uuid,
      });
    }, duration);

    // Appear animation
    const baseHeight = position.y;
    animate.add({
      duration,
      timingFunction: 'easeInOutBack',
    }).on('progress', ({ value, advancement }) => {
      // Fall down anim
      const h = baseHeight + 2 - advancement * 2;
      this.entityCluster.setPositionAt(index, new THREE.Vector3(position.x, h, position.z));
      this.entityCluster.geometry.attributes.instancePosition.needsUpdate = true;

      // Scale anim
      this.entityCluster.setScaleAt(index, scale.set(value, value, value));
      this.entityCluster.geometry.attributes.instanceScale.needsUpdate = true;
    });
  }

  /**
   * Get item info from index in geometry
   * @param {Number} index
   */
  getItem(index) {
    return {
      model: this.name,
      ...this.entityCluster.getItem(index),
    };
  }

  /**
   * Get item info from unique id
   * @param {String} uuid
   */
  getEntity(uuid) {
    return this.entityCluster.getItem(this.entityCluster.getIndex(uuid));
  }

  /**
   * Remove item from his index
   * @param {Number} index
   */
  removeItem(index) {
    const scaleFrom = this.entityCluster.getScaleAt(index);
    const scale = new THREE.Vector3();

    // Disable picking on item
    this.pickingCluster.removeItem(index);

    // Disappear animation
    animate.add({
      duration: 400,
      timingFunction: 'easeInOutBack',
    }).on('progress', ({ value }) => {
      this.entityCluster.setScaleAt(index, scale.set(
        scaleFrom.x - scaleFrom.x * value,
        scaleFrom.y - scaleFrom.y * value,
        scaleFrom.z - scaleFrom.z * value,
      ));
      this.entityCluster.geometry.attributes.instanceScale.needsUpdate = true;
    }).on('end', () => {
      this.entityCluster.removeItem(index);
    });
  }

  /**
   * Remove item from his unique id
   * @param {String} uuid
   */
  removeEntity(uuid) {
    return this.removeItem(this.entityCluster.getIndex(uuid));
  }
}
