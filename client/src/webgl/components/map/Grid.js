import vertexShader from './shaders/grid.vert';
import fragmentShader from './shaders/grid.frag';

class Grid extends THREE.Mesh {
  constructor({
    cellSize = 1,
    size = new THREE.Vector2(32, 32),
    position = new THREE.Vector3(),
  } = {}) {
    super(
      new THREE.PlaneGeometry(size.x * cellSize, size.y * cellSize),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          size: {
            value: size,
          },
          width: {
            value: 0.002,
          },
        },
        transparent: true,
      }),
    );

    this.size = size;
    this.box = new THREE.Box2(
      new THREE.Vector2(0, 0),
      new THREE.Vector2(31, 31),
    );

    this.cellSize = cellSize;
    this.rotation.x = -Math.PI / 2;

    this.position.copy(position);
  }

  checkIntersection(bbox) {
    if (!this.box.containsBox(bbox)) return false;


    return true;
  }

  getCellFromUV(uv, destination = new THREE.Vector2()) {
    destination.x = Math.floor(uv.x * this.size.x);
    destination.y = Math.floor(uv.y * this.size.y);
    return destination;
  }

  getCellFromPosition(point, destination = new THREE.Vector2()) {
    destination.x = Math.floor(point.x + this.size.x / 2);
    destination.y = Math.floor(point.z + this.size.y / 2);
    return destination;
  }
}

export default Grid;
