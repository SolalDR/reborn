import animate from '@solaldr/animate';
import Cluster from '../cluster';
import GUI from '@/plugins/GUI';
import modelsConfig from '@/config/models';
import config from '@/config';

export default class EntityModelGroup {
  constructor(name, {
    geometry = null,
    material = null,
    slot = null,
    webgl = null,
  } = {}) {
    this.name = name;
    this.material = material;
    this.slot = slot;
    this.webgl = webgl;
    this.scene = this.webgl.scene;

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
    this.pickingMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF0000,
    });

    const hiddenLocation = new THREE.Vector3(0, 200, 0);

    // Create clusters
    this.entityCluster = new Cluster(this.geometry, material, {
      hiddenLocation,
    });

    // Custom material edition
    if (modelsConfig.materials[this.name]) {
      Object.keys(modelsConfig.materials[this.name]).forEach((key) => {
        this.entityCluster.material[key] = modelsConfig.materials[this.name][key];
      });
    }

    this.initGUI();
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


    const mesh = new THREE.Mesh(this.pickingGeometry, this.pickingMaterial);
    mesh.position.copy(position);
    mesh.name = `${this.name}-${index}`;
    mesh.matrixWorld.setPosition(position);
    mesh.modelViewMatrix.setPosition(position);


    // Wait before make the item pickable
    setTimeout(() => {
      this.webgl.renderer.pickingScene.add(mesh);
      // console.log(mesh);
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
    const mesh = this.webgl.renderer.pickingScene.getObjectByName(`${this.name}-${index}`);
    this.webgl.renderer.pickingScene.remove(mesh);

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

  /**
   * Enable GUI on the model
   */
  initGUI() {
    if (config.gui.models) {
      GUI.world.addMaterial(this.name, this.entityCluster.material);
    }
  }
}
