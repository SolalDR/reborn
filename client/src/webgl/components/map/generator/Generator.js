import MyWorker from './map.worker.js';
import theme from '@/config/theme';

const worker = new MyWorker();

export default (seed = Math.random()) => {
  let s = seed;
  function random() {
    const x = Math.cos(Math.sin(s += 1.4215428299510) * 4.8025158293) * 14126.123423;
    return x - Math.floor(x);
  }

  function randBetween(a, b) {
    return a + (b - a) * random();
  }

  function manageRand(value) {
    return typeof value === 'number'
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
        altitude: stage.altitude ? manageRand(stage.altitude) : 0,
        shape: {
          rotation: stage.rotation ? stage.rotation : 0,
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
