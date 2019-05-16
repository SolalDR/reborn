import LineSystem from '../line/LineSystem';
import GUI from '@/plugins/GUI';
import config from '@/config/worlds';

export default class Waves {
  constructor({
    path = null,
  } = {}) {
    this.geometry = new THREE.Geometry();
    path.currentPath.getPoints(30).forEach((point) => {
      this.geometry.vertices.push(
        new THREE.Vector3(point.x, -point.y, 0).multiplyScalar(0.07),
      );
    });

    this.cluster = new LineSystem(this.geometry, {
      limit: 1000,
      lineWidth: 2,
      depthTest: true,
      depthWrite: true,
    });

    this.cluster.mesh.frustumCulled = false;

    for (let i = 0; i < 1000; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 130 + 20;
      this.cluster.addItem({
        position: new THREE.Vector3(Math.cos(angle) * radius, 0.5, Math.sin(angle) * radius),
        rotation: new THREE.Euler(0, -angle + Math.PI / 2, 0),
        dashOffset: Math.random() * 2,
      });
    }
    this.mesh = this.cluster.mesh;
    this.mesh.geometry.maxInstancedCount = config.waves.count;

    this.initGUI();
  }

  initGUI() {
    const folder = GUI.world.addFolder('Waves');
    folder.addVector('Position', this.cluster.mesh.position);
    folder.add(config.waves, 'speed', 0, 0.2).step(0.0001);
    folder.add(config.waves, 'count', 0, 1000).step(1).onChange((value) => {
      this.mesh.geometry.maxInstancedCount = value;
    });
  }

  render() {
    this.mesh.material.uniforms.dashOffset.value += config.waves.speed;
  }
}
