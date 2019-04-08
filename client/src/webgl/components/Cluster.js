import { Mesh } from 'three';
import beforeVertexChunk from './cluster/include_vertex.glsl';

class Cluster extends THREE.Group {
  constructor(geometry, material, {
    limit = 100,
    hiddenLocation = new THREE.Vector3(10000, 10000, 10000),
  } = {}) {
    super();
    this.offset = 0;
    this.limit = limit;
    this.hiddenLocation = new THREE.Vector3(10000, 10000, 10000);
    this.geometry = new THREE.InstancedBufferGeometry().copy(geometry);
    this.geometry.maxInstancedCount = 0;
    this.material = material.clone();
    this.availables = new Float32Array(limit);
    this.entities = new Array(limit).fill(false);

    this.material.onBeforeCompile = (program) => {
      program.vertexShader = `${beforeVertexChunk}\n\r${program.vertexShader}`;
    };

    const translationBuffer = new Float32Array(limit * 3);
    const rotationBuffer = new Float32Array(limit * 4);
    const scaleBuffer = new Float32Array(limit * 3);
    const q = new THREE.Quaternion();

    for (let i = 0; i < limit; i += 1) {
      this.availables[i] = i;

      translationBuffer[i * 3] = hiddenLocation.x;
      translationBuffer[i * 3 + 1] = hiddenLocation.y;
      translationBuffer[i * 3 + 2] = hiddenLocation.z;

      rotationBuffer[i * 4] = q.x;
      rotationBuffer[i * 4 + 1] = q.y;
      rotationBuffer[i * 4 + 2] = q.z;
      rotationBuffer[i * 4 + 3] = q.w;

      scaleBuffer[i * 3] = 1;
      scaleBuffer[i * 3 + 1] = 1;
      scaleBuffer[i * 3 + 2] = 1;
    }

    this.geometry.addAttribute('translation', new THREE.InstancedBufferAttribute(translationBuffer, 3, false));
    this.geometry.addAttribute('rotation', new THREE.InstancedBufferAttribute(rotationBuffer, 4, false));
    this.geometry.addAttribute('scale', new THREE.InstancedBufferAttribute(scaleBuffer, 3, false));

    this.mesh = new Mesh(this.geometry, this.material);
  }


  // addItem({
  //   // position = new THREE.Vector3(),
  // } = {}) {
  //   // if (isNaN(this.availables[0])) return;

  //   // const rank = this.availables[0];

  // }

  getPositionAt(i) {
    if (this.entities[i]) {
      // return this.translationBuffer
    }

    return null;
  }

  removeItem(uuid) {
    this.meshes.delete(uuid);
  }
}

export default Cluster;

// {
//   id,
//   name,
//   content,
//   role,         // Nature, Civilisation, null
//   count,        // Nombre de fois ou elle a été appelé
//   limit,        // Limit du nombre de fois ou elle a été appelé
//   constraints: [
//     {
//       name: 'money',
//       value: 10,
//       direction: 'ASC' || 'DESC'
//     }
//   ]
// }
