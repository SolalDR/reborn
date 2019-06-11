import animate from '@solaldr/animate';
import Grid from './Grid';
import GridHelper from './GridHelper';
import Bus from '@/plugins/Bus';
import GUI from '@/plugins/GUI';
import theme from '@/config/theme';
import config from '../../../config';

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
    this.initGUI();
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
    this.water.frustumCulled = false;
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


        if (!a) {
          // this.gridHelper.status = 'transparent';
          // const fromColor = this.gridHelper.material.color.clone();
          const toColorRed = new THREE.Color(0xFF8894);
          this.gridHelper.material.color.setRGB(toColorRed.r, toColorRed.g, toColorRed.b);
          this.gridHelper.material.opacity = 0.5;
          // const fromOpacity = this.gridHelper.material.opacity;
          // const toOpacity = 0.5;

          // animate.add({ duration: 200 }).on('progress', ({ value }) => {
          //   this.gridHelper.material.color.setRGB(
          //     THREE.Math.lerp(fromColor.r, toColorRed.r, value),
          //     THREE.Math.lerp(fromColor.g, toColorRed.g, value),
          //     THREE.Math.lerp(fromColor.b, toColorRed.b, value),
          //   );
          //   this.gridHelper.material.opacity = THREE.Math.lerp(fromOpacity, toOpacity, value);
          // });
        } else {
          // this.gridHelper.status = 'plain';
          // const fromColor = this.gridHelper.material.color.clone();
          // const toColorRed = new THREE.Color(0x000000);
          // const fromOpacity = this.gridHelper.material.opacity;
          // const toOpacity = 0.5;
          this.gridHelper.material.color.setRGB(0, 0, 0);
          this.gridHelper.material.opacity = 0.5;


          // animate.add({ duration: 200 }).on('progress', ({ value }) => {
          //   this.gridHelper.material.color.setRGB(
          //     THREE.Math.lerp(fromColor.r, toColorRed.r, value),
          //     THREE.Math.lerp(fromColor.g, toColorRed.g, value),
          //     THREE.Math.lerp(fromColor.b, toColorRed.b, value),
          //   );
          //   this.gridHelper.material.opacity = THREE.Math.lerp(fromOpacity, toOpacity, value);
          // });
        }
      } else {
        this.gridHelper.status = 'out';
        this.gridHelper.material.opacity = 0;
        // animate.add({ from: this.gridHelper.material.opacity, to: 0, duration: 100 }).on('progress', ({ value }) => {
        //   this.gridHelper.material.opacity = value;
        // });
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

    let count = 0;
    for (let i = 0; i < this.grid.size[0]; i++) {
      for (let j = 0; j < this.grid.size[1]; j++) {
        const cell = this.grid.get({ x: i, y: j });

        if (cell) {
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(
            i - this.grid.size[0] / 2 + 0.5,
            cell.altitude + 0.2,
            j - this.grid.size[1] / 2 + 0.5,
          );
          count ++;
          this.add(mesh);
        }
      }
    }
    console.log('RATIO: ', count/1024);
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
    this.water.receiveShadow = true;
    this.water.frustumCulled = false;
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

  initGUI() {
    if (config.debug.gridCases) {
      this.displayPlayground();
    }
  }
}
