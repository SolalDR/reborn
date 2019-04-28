import MyWorker from './map.worker.js';

const worker = new MyWorker();

export default (seed = Math.random()) => {
  // Seed random function
  function random() {
    const x = Math.cos(Math.sin(seed += 1.421542) * 1.50782) * 10000;
    return x - Math.floor(x);
  }

  // Define worker params
  worker.postMessage({
    seed,
    stages: [
      {
        shape: {
          definition: 200,
          radius: 16,
          position: [0, 0],
          noiseIntensity: 0.2,
        },
        height: 0.5,
      },
      {
        shape: {
          definition: 200,
          radius: 8,
          position: [
            random() * 8 - 4,
            random() * 8 - 4,
          ],
          noiseIntensity: 0.2,
        },
        height: 1,
      },
      {
        shape: {
          definition: 200,
          radius: 8,
          position: [
            random() * 8 - 4,
            random() * 8 - 4,
          ],
          noiseIntensity: 0.2,
        },
        height: 2,
      },
      {
        shape: {
          definition: 200,
          radius: 4,
          position: [
            random() * 4 - 2,
            random() * 4 - 2,
          ],
          noiseIntensity: 0.1,
        },
        height: 4,
      },
    ],
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
      grid: event.data.grid,
    });
  };

  return new Promise(promiseCallback);
};
