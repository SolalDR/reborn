import Emitter from '@solaldr/emitter';
import LineSystem from '../line/LineSystem';
import GUI from '@/plugins/GUI';
import config from '@/config/worlds';

export default class SmokeCluster extends Emitter {
  constructor({
    path = null,
    name = null,
    minOffset = null,
    maxOffset = null,
    dashOffset = 0,
  } = {}) {
    super();
    this.name = name;
    this.path = path;
    this.minOffset = minOffset;
    this.maxOffset = maxOffset;
    this.dashOffset = dashOffset;

    this.geometry = new THREE.Geometry();
    this.path.currentPath.getPoints(30).forEach((point) => {
      this.geometry.vertices.push(
        new THREE.Vector3(point.x, -point.y, 0).multiplyScalar(0.05),
      );
    });

    console.log(this.geometry);

    this.cluster = new LineSystem(this.geometry, {
      lineWidth: 2,
      depthTest: true,
      depthWrite: true,
      minOffset: this.minOffset,
      maxOffset: this.maxOffset,
      dashOffset: this.dashOffset,
    });

    this.cluster.mesh.geometry.maxInstancedCount = 60;
    this.cluster.mesh.frustumCulled = false;

    // this.initGUI();

    return this.cluster;
  }

  // initGUI() {
  //   const folder = GUI.world.addFolder(`Smoke ${this.name}`);
  //   folder.addVector('Position', this.cluster.mesh.position);
  //   folder.add(config.waves, 'speed', 0, 0.2).step(0.0001);
  //   folder.add(config.waves, 'count', 0, 1000).step(1).onChange((value) => {
  //     this.mesh.geometry.maxInstancedCount = value;
  //   });
  // }
}
