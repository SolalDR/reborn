import MyWorker from './map.worker.js';
import theme from '@/config/theme';

const worker = new MyWorker();

export default (seed = Math.random()) => {
  // Seed random function
  function random() {
    const x = Math.cos(Math.sin(seed += 1.4215428299510) * 4.8025158293) * 14126.123423;
    return x - Math.floor(x);
  }

  function randBetween(a, b) {
    return a + (b - a) * random();
  }

  function manageRand(value) {
    return !isNaN(value)
      ? value
      : randBetween(value[0], value[1]);
  }

  // Define worker params
  worker.postMessage({
    seed,
    stages: theme.map.stages.map((stage) => {
      return {
        floorColor: new THREE.Color(stage.floorColor),
        wallColor: new THREE.Color(stage.wallColor),
        height: manageRand(stage.height),
        shape: {
          definition: stage.definition,
          radius: manageRand(stage.radius),
          noiseIntensity: manageRand(stage.noise),
          position: [
            manageRand(stage.position.x),
            manageRand(stage.position.y),
          ],
        },
      };
    }),
    // stages: [
    //   {
    //     floorColor: new THREE.Color(0xf7c0a4),
    //     wallColor: new THREE.Color(0xf9e78f),
    //     shape: {
    //       definition: 200,
    //       radius: 16,
    //       position: [0, 0],
    //       noiseIntensity: 0.2 + 0.3 * random(),
    //     },
    //     height: 0.5,
    //   },
    //   {
    //     floorColor: new THREE.Color(0xf4b295),
    //     wallColor: new THREE.Color(0xf9e78f),
    //     shape: {
    //       definition: 64,
    //       radius: 8,
    //       position: [
    //         random() * 8 - 4,
    //         random() * 8 - 4,
    //       ],
    //       noiseIntensity: 0.2,
    //     },
    //     height: 1,
    //   },
    //   {
    //     floorColor: new THREE.Color(0xf8dbca),
    //     wallColor: new THREE.Color(0xf9e78f),
    //     shape: {
    //       definition: 64,
    //       radius: 8,
    //       position: [
    //         random() * 8 - 4,
    //         random() * 8 - 4,
    //       ],
    //       noiseIntensity: 0.2,
    //     },
    //     height: 2,
    //   },
    //   {
    //     floorColor: new THREE.Color(0xf4b69d),
    //     wallColor: new THREE.Color(0xf9e78f),
    //     shape: {
    //       definition: 48,
    //       radius: 4,
    //       position: [
    //         random() * 4 - 2,
    //         random() * 4 - 2,
    //       ],
    //       noiseIntensity: 0.1,
    //     },
    //     height: 4,
    //   },
    //   {
    //     floorColor: new THREE.Color(0xf7ab9a),
    //     wallColor: new THREE.Color(0xf9e78f),
    //     shape: {
    //       definition: 32,
    //       radius: 2,
    //       position: [
    //         random() * 16 - 8,
    //         random() * 16 - 8,
    //       ],
    //       noiseIntensity: 0.1,
    //     },
    //     height: random() * 5 + 6,
    //   },
    // ],
  });

  let resolver = null;
  const promiseCallback = (resolve) => {
    resolver = resolve;
  };

  // When worker finish
  worker.onmessage = function (event) {
    const geometry = new THREE.Geometry();

    // Attribute faces
    event.data.faces.forEach((face) => {
      geometry.faces.push(new THREE.Face3(
        face.a,
        face.b,
        face.c,
        new THREE.Vector3(face.normal.x, face.normal.y, face.normal.z),
        new THREE.Color(face.color.r, face.color.g, face.color.b),
        face.materialIndex,
      ));
    });

    // Attribute vertices
    event.data.vertices.forEach((vertice) => {
      geometry.vertices.push(new THREE.Vector3(vertice.x, vertice.y, vertice.z));
    });

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    // Close worker
    worker.terminate();

    // Resolve promise
    resolver({
      geometry,
      gridDatas: event.data.gridDatas,
    });
  };

  return new Promise(promiseCallback);
};
