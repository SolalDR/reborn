import animate from '@solaldr/animate';
import LineSystem from '../../line/LineSystem';
import GUI from '@/plugins/GUI';

export default class Explosion {
  constructor({
    count = 10,
    radius = 0.5,
  } = {}) {
    const geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3(0, 0, 0));
    geo.vertices.push(new THREE.Vector3(0, 0, 1));

    this.cluster = new LineSystem(geo, {
      limit: count,
      lineWidth: 4,
      dashArray: 2,
      dashRatio: 0.9,
      depthTest: true,
      depthWrite: true,
    });

    const stepAngle = (2 * Math.PI) / count;
    let angle = 0;
    for (let i = 0; i < count; i++) {
      angle = i * stepAngle;
      this.cluster.addItem({
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius,
        ),
        rotation: new THREE.Euler(0, -angle, 0),
      });
    }

    this.mesh = this.cluster.mesh;
    this.mesh.position.y = 5;
    this.speed = 0.05;
    this.scale = 1.5;
    this.mesh.scale.set(this.scale, this.scale, this.scale);
    this.initGUI();
  }

  initGUI() {
    const folder = GUI.scene.addFolder('Explosion');
    folder.addVector('position', this.mesh.position);
    folder.add(this, 'scale', 0, 5).step(0.1).onChange((value) => {
      this.mesh.scale.set(value, value, value);
    });

    this.cluster.initGUI(folder);
    folder.add(this, 'speed', 0, 0.1).step(0.001);
    folder.add(this, 'explode');
  }

  explode({
    duration = 500,
    delay = 0,
  } = {}) {
    animate.add({
      duration,
      delay,
      from: 0,
      to: -1,
      timingFunction: 'easeOutQuad',
    }).on('progress', ({ value }) => {
      this.cluster.dashOffset = value;
    });
  }

  render() {
    // this.cluster.dashOffset -= this.speed;
  }
}
