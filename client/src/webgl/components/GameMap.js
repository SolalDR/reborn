const loader = new THREE.TextureLoader();

export default class GameMap extends THREE.Group {
  constructor({
    resolution = 2,
    size = [32, 32],
  } = {}) {
    super();
    this.size = size;
    this.resolution = resolution;

    this.initFloor();
    this.initWater();


    this.add(this.floor);
    this.add(this.water);
  }

  initFloor() {
    const geometry = new THREE.BoxGeometry(
      this.size[0],
      this.size[1],
      1.5,
      this.size[0] * this.resolution,
      this.size[1] * this.resolution,
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

    loader.load('/game/ile.png', (texture) => {
      material.displacementMap = texture;
      material.bumpMap = texture;
      // material.displacementScale = 5;
      // material.bumpScale = 5;
      material.needsUpdate = true;
    });

    loader.load('/game/ile_2.png', (texture) => {
      material.map = texture;
      material.needsUpdate = true;
    });

    geometry.rotateX(-Math.PI / 2);
    this.floor = new THREE.Mesh(geometry, material);
    this.floor.position.y -= 1;
  }

  initWater() {
    const geometry = new THREE.PlaneGeometry(
      this.size[0] * 10,
      this.size[1] * 10,
    );

    const material = new THREE.MeshToonMaterial({
      color: 0x036564,
      // specular: 0x3f7a85,
    });

    geometry.rotateX(-Math.PI / 2);
    this.water = new THREE.Mesh(geometry, material);
  }
}
