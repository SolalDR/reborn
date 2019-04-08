import Grid from './Grid';
import Bus from '../../../plugins/Bus';
import GridHelper from './GridHelper';

const loader = new THREE.TextureLoader();

export default class GameMap extends THREE.Group {
  constructor({
    resolution = 2,
    cellSize = 1,
    size = new THREE.Vector2(32, 32),
  } = {}) {
    super();
    this.size = size;
    this.cellSize = cellSize;
    this.resolution = resolution;

    this.initFloor();
    this.initWater();

    const gridParams = {
      size,
      cellSize,
      position: new THREE.Vector3(0, 1, 0),
    };

    this.grid = new Grid(gridParams);
    this.gridHelper = new GridHelper(gridParams);
    this.gridHelper.setSize(2, 3);


    Bus.$on('cast', (intersection) => {
      const cell = this.grid.getCellFromUV(intersection.uv);
      this.gridHelper.updatePosition(cell, intersection.uv);
    });


    this.add(this.grid);
    this.add(this.gridHelper);
    this.add(this.floor);
    this.add(this.water);
  }

  initFloor() {
    const geometry = new THREE.BoxGeometry(
      this.size.x * this.cellSize,
      this.size.y * this.cellSize,
      1.5,
      this.size.x * this.resolution,
      this.size.y * this.resolution,
      1,
    );

    const material = new THREE.MeshToonMaterial({
      color: 0xCDB380,
      bumpScale: 0.1,
      specular: 0x798133,
      reflectivity: 0,
      shininess: 0,
      // flatShading: true,
    });

    loader.load('/game/ile.png', () => {
      // material.displacementMap = texture;
      // material.bumpMap = texture;
      // material.displacementScale = 5;
      // material.bumpScale = 5;
      material.needsUpdate = true;
    });

    loader.load('/game/ile_2.png', () => {
      // material.map = texture;
      material.needsUpdate = true;
    });

    geometry.rotateX(-Math.PI / 2);
    this.floor = new THREE.Mesh(geometry, material);
    this.floor.position.y = 0;
  }

  initWater() {
    const geometry = new THREE.PlaneGeometry(
      this.size.x * this.cellSize * 10,
      this.size.y * this.cellSize * 10,
    );

    const material = new THREE.MeshToonMaterial({
      color: 0x036564,
      // specular: 0x3f7a85,
    });

    geometry.rotateX(-Math.PI / 2);
    this.water = new THREE.Mesh(geometry, material);
  }
}
