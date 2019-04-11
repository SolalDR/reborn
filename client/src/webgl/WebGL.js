import Viewport from '../plugins/Viewport';
import GameMap from './components/map';
import Controls from './controls';
import Cluster from './components/cluster';
import Raycaster from './core/Raycaster';
import mouse from '../plugins/Mouse';
import AssetsManager from '../services/assets/Manager';

// import blobVertex from './shaders/blob.vert';
// import blobFragment from './shaders/blob.frag';

export default class WebGL {
  constructor(canvas) {
    this.canvas = canvas;

    // Renderer
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
    });

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, Viewport.width / Viewport.height, 1, 1000);
    this.controls = new Controls({
      camera: this.camera,
    });

    this.raycaster = new Raycaster({
      scene: this.scene,
      camera: this.camera,
    });


    this.initScene();
    this.loop();
  }

  initEvents() {
    Viewport.$on('resize', () => {
      this.renderer.setSize(Viewport.width, Viewport.height);
    });

    this.raycaster.on('cast', () => {
    });
  }

  initScene() {
    this.renderer.setClearColor(0xb7eeff);
    this.renderer.setSize(Viewport.width, Viewport.height);
    this.scene.fog = new THREE.Fog(0xb7eeff, 60, 150);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this.scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xFFFFFF, 0.5);
    this.scene.add(light);

    this.map = new GameMap({
      cellSize: 1,
      size: new THREE.Vector2(32, 32),
    });
    this.scene.add(this.map);
    this.raycaster.object = this.map.floor;

    // const geometry = new THREE.DodecahedronGeometry(3, 5);
    // this.morphElement = new THREE.Points(geometry, new THREE.ShaderMaterial({
    //   uniforms: {
    //     u_time: {
    //       value: 0.0,
    //     },
    //   },
    //   vertexShader: blobVertex,
    //   fragmentShader: blobFragment,
    //   transparent: true,
    // }));
    // this.scene.add(this.morphElement);
    // this.morphElement.position.y = 5;


    AssetsManager.loader.on('load:models', (results) => {
      const material = new THREE.MeshToonMaterial({
        vertexColors: THREE.VertexColors,
      });
      const cubeCluster = new Cluster(results.maison.result.scene.children[0].geometry, material);

      mouse.$on('click', () => {
        if (!mouse.dragDelta) {
          cubeCluster.addItem({
            position: this.map.gridHelper.position,
            rotation: new THREE.Euler(0, Math.PI * 2 * Math.random(), 0),
          });
        }
      });

      this.scene.add(cubeCluster.mesh);
    });


    light.position.set(100, 100, 100);
    this.camera.position.set(0, 20, 20);
    this.camera.lookAt(new THREE.Vector3());
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));
    this.controls.loop();
    this.renderer.render(this.scene, this.camera);
  }
}
