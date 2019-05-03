import Grid from './Grid';
import Bus from '../../../plugins/Bus';
import GridHelper from './GridHelper';

export default class GameMap extends THREE.Group {
  constructor({
    resolution = 2,
    cellSize = 1,
    size = new THREE.Vector2(32, 32),
    raycaster = null,
    geometry = null,
    gridDatas = null,
  } = {}) {
    super();
    this.size = size;
    this.cellSize = cellSize;
    this.resolution = resolution;
    this.raycaster = raycaster;

    const gridParams = {
      size,
      cellSize,
      position: new THREE.Vector3(0, 1, 0),
    };


    this.grid = new Grid(gridParams);
    for (let i = 0; i < gridDatas.length; i++) {
      this.grid.register(i, gridDatas[i]);
    }

    this.gridHelper = new GridHelper(gridParams);
    this.gridHelper.setSize(2, 2);

    this.add(this.gridHelper);

    this.initCastEvent();
    this.initWater();
    this.initFloor(geometry);

    // TODO: Add in config
    // this.displayPlayground();
  }

  /**
   * Affiche le sol
   */
  initFloor(geometry) {
    const material = new THREE.MeshToonMaterial({
      vertexColors: THREE.FaceColors,
      bumpScale: 0.1,
      specular: 0x798133,
      reflectivity: 0,
      shininess: 0,
      flatShading: false,
    });

    this.floor = new THREE.Mesh(geometry, material);
    this.floor.position.y = -0.1;
    this.add(this.floor);
    this.raycaster.object = this.floor;
  }

  /**
   * Init l'écoute de l'évenement de raycasting pour bouger le helper
   */
  initCastEvent() {
    Bus.$on('cast', (intersection) => {
      if (intersection && intersection.face.normal.y > 0.99) {
        this.gridHelper.visible = true;

        // Récupère les coordonnée de cellule courante
        const cell = this.grid.getCell(intersection.point);
        const a = this.grid.checkSpace(intersection.point, this.gridHelper.scale);
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

  /**
   * Outil de debug pour afficher les case disponibles
   */
  displayPlayground() {
    const geo = new THREE.PlaneGeometry(1, 1);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x00FF00,
      transparent: true,
      opacity: 0.5,
    });

    for (let i = 0; i < this.grid.size[0]; i++) {
      for (let j = 0; j < this.grid.size[1]; j++) {
        const cell = this.grid.get({ x: i, y: j });
        // console.log(cell);

        if (cell) {
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(
            i - this.grid.size[0] / 2 + 0.5,
            cell.altitude,
            j - this.grid.size[1] / 2 + 0.5,
          );

          this.add(mesh);
        }
      }
    }
  }

  /**
   * Afficher l'eau
   */
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
