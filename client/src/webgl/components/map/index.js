import animate from '@solaldr/animate';
import Grid from './Grid';
import GridHelper from './GridHelper';
import Bus from '@/plugins/Bus';
import GUI from '@/plugins/GUI';
import theme from '@/config/theme';

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
    this.gridHelper.setSize(1, 1);

    this.add(this.gridHelper);

    this.initCastEvent();
    this.initWater();
    this.initFloor(geometry);

    console.log(this);
    // TODO: Add in config
    // this.displayPlayground();
  }

  /**
   * Affiche le sol
   */
  initFloor(geometry) {
    const material = new THREE.MeshToonMaterial({
      vertexColors: THREE.FaceColors,
      specular: theme.map.specular,
      reflectivity: theme.map.reflectivity,
      shininess: theme.map.shininess,
      flatShading: false,
    });

    GUI.map.addMaterial('Ground', material);

    this.floor = new THREE.Mesh(geometry, material);
    this.floor.castShadow = true;
    this.floor.receiveShadow = true;
    this.floor.geometry.computeFaceNormals();
    this.floor.geometry.computeVertexNormals();
    this.floor.position.y = 0.1;

    this.add(this.floor);
    this.raycaster.object = this.floor;
  }

  /**
   * Init l'écoute de l'évenement de raycasting pour bouger le helper
   */
  initCastEvent() {
    Bus.$on('cast', (intersection) => {
      if (intersection && intersection.face.normal.y > 0.99) {
        if (this.gridHelper.status === 'out') {
          // this.gridHelper.visible = true;
        }

        // Récupère les coordonnée de cellule courante
        const cell = this.grid.getCell(intersection.point);
        const a = this.grid.checkSpace(intersection.point, this.gridHelper.scale);
        this.gridHelper.updatePosition(cell, intersection.point);


        if (!a && this.gridHelper.status !== 'transparent') {
          this.gridHelper.status = 'transparent';
          animate.add({ from: this.gridHelper.material.opacity, to: 0.4, duration: 200 }).on('progress', ({ value }) => {
            this.gridHelper.material.opacity = value;
          });
        } else if (this.gridHelper.status !== 'plain') {
          this.gridHelper.status = 'plain';
          animate.add({ from: this.gridHelper.material.opacity, to: 1, duration: 200 }).on('progress', ({ value }) => {
            this.gridHelper.material.opacity = value;
          });
        }
      } else {
        this.gridHelper.status = 'out';
        animate.add({ from: this.gridHelper.material.opacity, to: 0, duration: 200 }).on('progress', ({ value }) => {
          this.gridHelper.material.opacity = value;
        });
        // this.gridHelper.visible = false;
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
      this.size.x * this.cellSize * 100,
      this.size.y * this.cellSize * 100,
    );

    const material = new THREE.MeshToonMaterial({
      color: theme.water.color,
      specular: theme.water.specular,
      shininess: 0,
    });

    GUI.map.addMaterial('Water', material);

    geometry.rotateX(-Math.PI / 2);
    this.water = new THREE.Mesh(geometry, material);
    this.add(this.water);
  }

  woobleAction({
    count = 110,
    speed = 60,
    intensity = 0.4,
    timingFunction = 'linear',
  } = {}) {
    const duration = speed * count;
    animate.add({ duration, timingFunction }).on('progress', (event) => {
      const rotation = Math.sin((event.value * Math.PI * 2) * count) * intensity;

      this.floor.position.x = rotation;
    }).on('end', () => {
      this.floor.position.x = 0;
    });
  }

  render() {
    this.gridHelper.render();
  }
}
