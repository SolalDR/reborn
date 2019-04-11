import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Loader from './Loader';

import DRACOLoader from './loaders/DRACOLoader';
// import SoundLoader from './loaders/SoundLoader';
import OBJLoader from './loaders/OBJLoader';

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
        // {
        //   test: /\.(?:mp3|wav)/,
        //   loader: new SoundLoader(),
        // },
        {
          test: /\..*?/,
          loader: new THREE.FileLoader(),
        },
      ],
    });
  }
}

export default new Manager();
