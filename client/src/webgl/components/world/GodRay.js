import LineSystem from '../line/LineSystem';
import GUI from '@/plugins/GUI';
import config from '@/config/worlds';
import theme from '@/config/theme';

export default class GodRay {
  constructor({
    path = null,
    minOffset = null,
    maxOffset = null,
    dashOffset = 0,
  } = {}) {
    this.geometry = new THREE.Geometry();
    path.currentPath.getPoints(30).forEach((point) => {
      this.geometry.vertices.push(
        new THREE.Vector3(point.x, -point.y, 0).multiplyScalar(0.3),
      );
    });

    this.cluster = new LineSystem(this.geometry, {
      limit: 500,
      lineWidth: 2,
      depthTest: true,
      depthWrite: true,
      minOffset,
      maxOffset,
      dashOffset,
    });

    this.cluster.mesh.frustumCulled = false;

    for (let i = 0; i < 500; i++) {
      const radius = Math.random() * 16;
      const angle = Math.random() * Math.PI * 2;
      this.cluster.addItem({
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          17,
          Math.sin(angle) * radius + 5,
        ),
        rotation: new THREE.Euler(0.4, 0, 0),
        dashOffset: Math.random() * 2,
      });
    }
    this.mesh = this.cluster.mesh;
    this.mesh.geometry.maxInstancedCount = 40;

    this.initGUI();
  }

  initGUI() {
    const folder = GUI.world.addFolder('Godray');
    folder.addVector('Position', this.cluster.mesh.position);
    folder.add(config.waves, 'speed', 0, 0.2).step(0.0001);
    folder.add(config.waves, 'count', 0, 1000).step(1).onChange((value) => {
      this.mesh.geometry.maxInstancedCount = value;
    });
  }
}
