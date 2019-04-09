import { Mesh } from 'three';
import beforeVertexChunk from './include_vertex.glsl';

const q = new THREE.Quaternion();

class Cluster extends THREE.Group {
  constructor(geometry, material, {
    limit = 100,
    hiddenLocation = new THREE.Vector3(1, 1, 1),
    dynamic = true,
  } = {}) {
    super();
    this.offset = 0;
    this.limit = limit;
    this.hiddenLocation = new THREE.Vector3(1, 1, 1);
    this.geometry = new THREE.InstancedBufferGeometry().copy(geometry);
    this.geometry.maxInstancedCount = 0;
    this.material = material.clone();
    this.availables = new Array(limit);
    this.entities = new Array(limit).fill(false);
    this.dynamic = dynamic;

    this.material.onBeforeCompile = (program) => {
      program.vertexShader = `${beforeVertexChunk}\n\r${program.vertexShader}`;

      program.vertexShader = program.vertexShader.replace(
        '#include <begin_vertex>',
        'vec3 transformed = ( _instanceMatrix * vec4( position , 1. )).xyz;',
      );

      program.vertexShader = program.vertexShader.replace(
        '#include <defaultnormal_vertex>',
        `mat4 _instanceMatrix = getInstanceMatrix();
         vec3 transformedNormal =  transposeMat3( inverse( mat3( modelViewMatrix * _instanceMatrix ) ) ) * objectNormal ;`,
      );
    };

    const translationBuffer = new Float32Array(limit * 3);
    const rotationBuffer = new Float32Array(limit * 4);
    const scaleBuffer = new Float32Array(limit * 3);

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

    this.geometry.addAttribute('instancePosition', new THREE.InstancedBufferAttribute(translationBuffer, 3, false));
    this.geometry.addAttribute('instanceQuaternion', new THREE.InstancedBufferAttribute(rotationBuffer, 4, false));
    this.geometry.addAttribute('instanceScale', new THREE.InstancedBufferAttribute(scaleBuffer, 3, false));

    this.geometry.attributes.instancePosition.setDynamic(dynamic);
    this.geometry.attributes.instanceQuaternion.setDynamic(dynamic);
    this.geometry.attributes.instanceScale.setDynamic(dynamic);

    this.mesh = new Mesh(this.geometry, this.material);
  }

  addItem({
    position = new THREE.Vector3(),
    scale = null,
    rotation = null,
  } = {}) {
    if (Number.isNaN(this.availables[0])) return;

    const index = this.availables[0];
    this.availables.shift();
    this.geometry.maxInstancedCount = this.limit - this.availables.length;

    if (position) {
      this.setPositionAt(index, position);
      this.geometry.attributes.instancePosition.needsUpdate = true;
    }

    if (scale) {
      this.setScaleAt(index, scale);
      this.geometry.attributes.instanceScale.needsUpdate = true;
    }

    if (rotation) {
      this.setRotationAt(index, rotation);
      this.geometry.attributes.instanceQuaternion.needsUpdate = true;
    }
  }

  /**
   * @todo
   */
  removeItem(uuid) {
    this.meshes.delete(uuid);
  }

  setPositionAt(index, position) {
    this.geometry.attributes.instancePosition.setXYZ(index, position.x, position.y, position.z);
  }

  setScaleAt(index, scale) {
    this.geometry.attributes.instanceScale.setXYZ(index, scale.x, scale.y, scale.z);
  }

  setRotationAt(index, rotate) {
    const r = rotate instanceof THREE.Euler ? q.setFromEuler(rotate) : rotate;
    this.geometry.attributes.instanceQuaternion.setXYZW(index, r.x, r.y, r.z, r.w);
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
