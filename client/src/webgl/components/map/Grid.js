import vertexShader from './shaders/grid.vert';
import fragmentShader from './shaders/grid.frag';

class Grid extends THREE.Mesh {
  constructor({
    width = 32,
    height = 32,
    size = new THREE.Vector2(32, 32),
    position = new THREE.Vector3(),
  } = {}) {
    super(
      new THREE.PlaneGeometry(width, height),
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

    this.cellSize = new THREE.Vector2(
      width / this.size.x,
      height / this.size.y,
    );

    this.rotation.x = -Math.PI / 2;

    this.position.copy(position);
  }

  getCellFromUV(uv, destination = new THREE.Vector2()) {
    destination.x = Math.floor(uv.x * this.size.x);
    destination.y = Math.floor(uv.y * this.size.y);
    return destination;
  }

  getBox(uv, boxSize, min = new THREE.Vector2(), max = new THREE.Vector2()) {
    function odd(value, added, size) {
      return Math.floor(
        value + added * size,
      );
    }

    function peer(value, added, size) {
      return Math.floor(
        value
        + (added
          + (value % size > size / 2 ? -1 : 0))
          * size,
      );
    }

    min.x = boxSize.x % 2 === 1
      ? odd(uv.x, -boxSize.x / 2, this.cellSize.x)
      : peer(uv.x, -boxSize.x / 2, this.cellSize.x);

    return [min, max];
  }
}

export default Grid;
