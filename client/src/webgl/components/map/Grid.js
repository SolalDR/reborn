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

    this.cellSize = cellSize;
    this.rotation.x = -Math.PI / 2;

    this.position.copy(position);
  }

  getCellFromUV(uv, destination = new THREE.Vector2()) {
    destination.x = Math.floor(uv.x * this.size.x);
    destination.y = Math.floor(uv.y * this.size.y);
    return destination;
  }
}

export default Grid;
