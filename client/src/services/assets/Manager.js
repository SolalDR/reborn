import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import SoundLoader from './loaders/SoundLoader';
import SVGLoader from 'three-svg-loader';
import Loader from './Loader';
import DRACOLoader from './loaders/DRACOLoader';

import globalDatas from '../../datas/global.json';

class Manager {
  constructor() {
    DRACOLoader.setDecoderPath('/draco');
    DRACOLoader.setDecoderConfig({ type: 'js' }); // (Optional) Override detection of WASM support.
    const dracoLoader = new DRACOLoader();

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    this.loader = new Loader({
      rules: [
        {
          test: /\.(?:glb|gltf)/,
          loader: gltfLoader,
        },
        {
          test: /\.(?:obj)/,
          loader: new OBJLoader(),
        },
        {
          test: /\.(?:drc)/,
          loader: dracoLoader,
        },
        {
          test: /\.(?:png|jpg|jpeg)/,
          loader: new THREE.TextureLoader(),
        },
        {
          test: /\.(?:svg)/,
          loader: new SVGLoader(),
        },
        {
          test: /\.(?:mp3|wav|m4a)/,
          loader: new SoundLoader(),
        },
        {
          test: /\..*?/,
          loader: new THREE.FileLoader(),
        },
      ],
    });

    this.main();
  }

  main() {
    this.loader.addGroup(globalDatas);
    this.loader.loadGroup('global');
  }

  get(name) {
    return this.loader.get(name);
  }
}

export default new Manager();
