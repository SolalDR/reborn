import EntityModelGroup from '../EntityModelGroup';
import SmokeCluster from '../../world/SmokeCluster';
import AssetsManager from '@/services/assets/Manager';
import GUI from '@/plugins/GUI';

export default class CoalFactory extends EntityModelGroup {
  constructor(name, args) {
    super(name, args);

    const images = AssetsManager.get('images', true);
    this.smokeCluster = new SmokeCluster({
      path: images.smoke_line.paths[0],
      limit: 300,
    });

    if (args.scene) {
      this.scene = args.scene;
      this.scene.add(this.smokeCluster.mesh);
    }

    GUI.world.addMesh(`line-${name}`, this.smokeCluster.mesh);
  }

  addItem({
    position = null,
  } = {}) {
    super.addItem(arguments[0]);

    const positionSmoke = position.clone();
    this.smokeCluster.addItem({
      position: new THREE.Vector3(
        positionSmoke.x + 0.5,
        positionSmoke.y + 3,
        positionSmoke.z,
      ),
      rotation: new THREE.Euler(0, Math.random(), 0),
      dashOffset: Math.random() * 2,
    });

    this.smokeCluster.addItem({
      position: new THREE.Vector3(
        positionSmoke.x + 0.5,
        positionSmoke.y + 3,
        positionSmoke.z + 0.5,
      ),
      rotation: new THREE.Euler(0, Math.random(), 0),
      dashOffset: Math.random() * 2,
    });

    this.smokeCluster.addItem({
      position: new THREE.Vector3(
        positionSmoke.x + 0.5,
        positionSmoke.y + 3,
        positionSmoke.z - 0.5,
      ),
      rotation: new THREE.Euler(0, Math.random(), 0),
      dashOffset: Math.random() * 2,
    });
  }

  removeItem(index) {
    super.removeItem(index);
    this.smokeCluster.removeItem(index * 2);
    this.smokeCluster.removeItem(index * 2 + 1);
    this.smokeCluster.removeItem(index * 2 + 2);
  }

  render() {
    this.smokeCluster.mesh.material.uniforms.dashOffset.value -= 0.015;
  }
}
