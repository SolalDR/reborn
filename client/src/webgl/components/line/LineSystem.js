import { MeshLine, MeshLineMaterial } from '../meshline';
import LineCluster from './LineCluster';

export default class LineSystem {
  constructor(geometry, {
    color = new THREE.Color(0x000000),
    // map = null,
    // useMap = true,
    resolution = new THREE.Vector2(window.innerWidth, window.innerHeight),
    sizeAttenuation = false,
    lineWidth = 2,
    near = 0.1,
    far = 1000,
    depthWrite = false,
    depthTest = false,
    alphaTest = 0.5,
    dashArray = 2.0,
    dashOffset = 1.0,
    dashRatio = 0.80,
    transparent = true,
    opacity = 1,
    side = THREE.DoubleSide,
    limit = 100,
  } = {}) {
    const line = new MeshLine();
    line.setGeometry(geometry);

    this.material = new MeshLineMaterial({
      color, resolution, sizeAttenuation, lineWidth, near, far, depthWrite, depthTest, alphaTest, dashArray, dashOffset, dashRatio, transparent, opacity, side
    });

    return new LineCluster(line.geometry, this.material, {
      limit,
    });
  }

  loop() {
    // Need override
  }
}