import Grid from './Grid';
import Bus from '../../../plugins/Bus';
import GridHelper from './GridHelper';
import generateMap from './generator/Generator';

export default class GameMap extends THREE.Group {
  constructor({
    resolution = 2,
    cellSize = 1,
    size = new THREE.Vector2(32, 32),
    raycaster = null,
  } = {}) {
    super();
    this.size = size;
    this.cellSize = cellSize;
    this.resolution = resolution;
    this.raycaster = raycaster;

    this.initFloor();
    this.initWater();

    const gridParams = {
      size,
      cellSize,
      position: new THREE.Vector3(0, 1, 0),
    };

    this.grid = new Grid(gridParams);
    this.gridHelper = new GridHelper(gridParams);
    this.gridHelper.setSize(1, 1);
    this.add(this.gridHelper);

    Bus.$on('cast', (intersection) => {
      if (intersection && intersection.face.normal.y > 0.99) {
        this.gridHelper.visible = true;
        const cell = this.grid.getCell(intersection.point);
        const a = this.grid.get(cell);

        // this.grid.checkSpace(cell);
        // console.log(cell, this.grid.get(cell));

        this.gridHelper.updatePosition(cell, intersection.point);
        if (!a) {
          this.gridHelper.material.color.set(0xFF0000);
        } else {
          this.gridHelper.material.color.set(0x00FF00);
        }
      } else {
        this.gridHelper.visible = false;
      }
    });
  }


  initFloor() {
    const material = new THREE.MeshToonMaterial({
      vertexColors: THREE.FaceColors,
      bumpScale: 0.1,
      specular: 0x798133,
      reflectivity: 0,
      shininess: 0,
      flatShading: false,
    });

    generateMap().then(({ geometry, grid }) => {
      this.floor = new THREE.Mesh(geometry, material);
      this.floor.position.y = -0.1;
      this.add(this.floor);

      grid.forEach((value, i) => {
        this.grid.register(i, value);
      });

      this.raycaster.object = this.floor;
    });
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
    this.add(this.water);
  }
}
