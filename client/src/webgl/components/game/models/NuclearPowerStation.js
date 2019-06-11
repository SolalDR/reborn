import EntityModelGroup from '../EntityModelGroup';
import SmokeCluster from '../../world/SmokeCluster';
import AssetsManager from '@/services/assets/Manager';
import GUI from '@/plugins/GUI';
import config from '@/config';

export default class CoalFactory extends EntityModelGroup {
  constructor(name, args) {
    super(name, args);

    const images = AssetsManager.get('images', true);
    this.smokeCluster = new SmokeCluster({
      path: images.smoke_line.paths[0],
      limit: 500,
    });

    this.scene.add(this.smokeCluster.mesh);
  }

  addItem({
    position = null,
  } = {}) {
    super.addItem(arguments[0]);

    const positionSmoke = position.clone();
    this.smokeCluster.addItem({
      position: new THREE.Vector3(
        positionSmoke.x + 0.2,
        positionSmoke.y + 2.7,
        positionSmoke.z,
      ),
      rotation: new THREE.Euler(0, Math.random(), 0),
      dashOffset: Math.random() * 2,
    });

    this.smokeCluster.addItem({
      position: new THREE.Vector3(
        positionSmoke.x + 0.2,
        positionSmoke.y + 2.7,
        positionSmoke.z + 0.5,
      ),
      rotation: new THREE.Euler(0, Math.random(), 0),
      dashOffset: Math.random() * 2,
    });

    this.smokeCluster.addItem({
      position: new THREE.Vector3(
        positionSmoke.x + 0.2,
        positionSmoke.y + 2.7,
        positionSmoke.z - 0.5,
      ),
      rotation: new THREE.Euler(0, Math.random(), 0),
      dashOffset: Math.random() * 2,
    });

    this.smokeCluster.addItem({
      position: new THREE.Vector3(
        positionSmoke.x - 0.4,
        positionSmoke.y + 3.4,
        positionSmoke.z - 0.4,
      ),
      rotation: new THREE.Euler(0, Math.random(), 0),
      dashOffset: Math.random() * 2,
    });

    this.smokeCluster.addItem({
      position: new THREE.Vector3(
        positionSmoke.x - 0.4,
        positionSmoke.y + 4.4,
        positionSmoke.z + 0.1,
      ),
      rotation: new THREE.Euler(0, Math.random(), 0),
      dashOffset: Math.random() * 2,
    });
  }

  removeItem(index) {
    super.removeItem(index);
    this.smokeCluster.removeItem(index * 5);
    this.smokeCluster.removeItem(index * 5 + 1);
    this.smokeCluster.removeItem(index * 5 + 2);
    this.smokeCluster.removeItem(index * 5 + 3);
    this.smokeCluster.removeItem(index * 5 + 4);
  }

  render() {
    this.smokeCluster.mesh.material.uniforms.dashOffset.value -= 0.02;
  }

  initGUI() {
    super.initGUI();
    if (config.gui.models) {
      GUI.world.addMesh(`line-${this.name}`, this.smokeCluster.mesh);
    }
  }
}
