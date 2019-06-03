import * as THREE from 'three';
import beforeVertexChunk from './include_vertex.glsl';

const q = new THREE.Quaternion();

class Cluster {
  constructor(geometry, material, {
    limit = 100,
    hiddenLocation = new THREE.Vector3(1, 1, 1),
    dynamic = true,
    picking = false,
  } = {}) {
    this.offset = 0;
    this.limit = limit;
    this.dynamic = dynamic;
    this.picking = picking;
    this.hiddenLocation = hiddenLocation;
    this.availables = new Array(limit);
    this.entities = new Array(limit).fill(null);
    this.indexMap = new Map();

    this.geometry = new THREE.InstancedBufferGeometry().copy(geometry);
    this.geometry.maxInstancedCount = 0;
    this.material = material.clone();

    this.setupInstanceGeometry();
    this.setupMaterial();

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    console.log(this.material);
    this.mesh.customDepthMaterial = this.material.clone();
    this.mesh.customDepthMaterial.depthPacking = THREE.RGBADepthPacking;
    this.mesh.customDepthMaterial.clipping = true;
    this.mesh.customDepthMaterial.onBeforeCompile = (program) => {
      program.vertexShader = `${beforeVertexChunk}\n\r${program.vertexShader}`;
      program.vertexShader = program.vertexShader.replace(
        '#include <begin_vertex>',
        [
          'vec3 transformed = ( _instanceMatrix * vec4( position , 1. )).xyz;',
          '#ifdef PICKING',
          'v_instancePickingColor = instancePickingColor;',
          '#endif',
        ].join('\n\r'),
      );
      program.vertexShader = program.vertexShader.replace(
        '#include <defaultnormal_vertex>',
        `mat4 _instanceMatrix = getInstanceMatrix();
         vec3 transformedNormal =  transposeMat3( inverse( mat3( modelViewMatrix * _instanceMatrix ) ) ) * objectNormal ;`,
      );

      program.fragmentShader = THREE.ShaderLib.depth.fragmentShader
    }

  }

  setupInstanceGeometry() {
    this.geometry.maxInstancedCount = 0;
    const translationBuffer = new Float32Array(this.limit * 3);
    const rotationBuffer = new Float32Array(this.limit * 4);
    const scaleBuffer = new Float32Array(this.limit * 3);

    for (let i = 0; i < this.limit; i += 1) {
      this.availables[i] = i;

      translationBuffer[i * 3] = this.hiddenLocation.x;
      translationBuffer[i * 3 + 1] = this.hiddenLocation.y;
      translationBuffer[i * 3 + 2] = this.hiddenLocation.z;

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

    this.geometry.attributes.instancePosition.setDynamic(this.dynamic);
    this.geometry.attributes.instanceQuaternion.setDynamic(this.dynamic);

    if (this.picking) {
      const pickingColorBuffer = new Float32Array(this.limit * 3);
      for (let i = 0; i < this.limit; i += 1) {
        pickingColorBuffer[i * 3] = 1;
        pickingColorBuffer[i * 3 + 1] = 1;
        pickingColorBuffer[i * 3 + 2] = 1;
      }

      this.geometry.addAttribute('instancePickingColor', new THREE.InstancedBufferAttribute(pickingColorBuffer, 3, false));
      this.geometry.attributes.instanceScale.setDynamic(this.dynamic);
    }
  }

  setupMaterial() {
    if (this.picking) {
      this.material.defines.PICKING = '';
    }

    this.material.onBeforeCompile = (program) => {
      program.vertexShader = `${beforeVertexChunk}\n\r${program.vertexShader}`;

      program.vertexShader = program.vertexShader.replace(
        '#include <begin_vertex>',
        [
          'vec3 transformed = ( _instanceMatrix * vec4( position , 1. )).xyz;',
          '#ifdef PICKING',
          'v_instancePickingColor = instancePickingColor;',
          '#endif',
        ].join('\n\r'),
      );

      program.vertexShader = program.vertexShader.replace(
        '#include <defaultnormal_vertex>',
        `mat4 _instanceMatrix = getInstanceMatrix();
         vec3 transformedNormal =  transposeMat3( inverse( mat3( modelViewMatrix * _instanceMatrix ) ) ) * objectNormal ;`,
      );

      program.fragmentShader = program.fragmentShader.replace(
        '#include <common>',
        [
          '#include <common>',
          '#ifdef PICKING',
          'varying vec3 v_instancePickingColor;',
          '#endif',
        ].join('\n\r'),
      );

      program.fragmentShader = program.fragmentShader.replace(
        'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
        [
          '#ifdef PICKING',
          'gl_FragColor = vec4( v_instancePickingColor, 1 );',
          '#else',
          'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
          '#endif',
        ].join('\n\r'),
      );
    };
  }

  addItem({
    position = new THREE.Vector3(),
    scale = null,
    rotation = null,
    pickingColor = null,
    uuid = null,
  } = {}) {
    if (Number.isNaN(this.availables[0])) return null;
    const index = this.availables[0];

    this.entities[index] = uuid;
    this.availables.shift();
    this.indexMap.set(uuid, index);

    if (index + 1 > this.geometry.maxInstancedCount) {
      this.geometry.maxInstancedCount = index + 1;
    }

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

    if (pickingColor) {
      this.setPickingColorAt(index, pickingColor);
      this.geometry.attributes.instancePickingColor.needsUpdate = true;
    }

    return index;
  }

  removeItem(index) {
    if (index + 1 === this.geometry.maxInstancedCount) {
      this.geometry.maxInstancedCount = index;
    }

    this.setPositionAt(index, this.hiddenLocation);
    this.geometry.attributes.instancePosition.needsUpdate = true;
    this.indexMap.delete(this.entities[index]);
    this.availables.unshift(index);
    this.entities[index] = null;
  }

  getItem(index) {
    return {
      position: this.getPositionAt(index),
      rotation: this.getRotationAt(index),
      scale: this.getScaleAt(index),
      pickingColor: this.picking ? this.getPickingColorAt(index) : null,
      uuid: this.entities[index],
      index,
    };
  }

  getIndex(uuid) {
    return this.indexMap.get(uuid);
  }

  getPositionAt(index) {
    const a = this.geometry.attributes.instancePosition;
    return new THREE.Vector3(
      a.array[index * a.itemSize + 0],
      a.array[index * a.itemSize + 1],
      a.array[index * a.itemSize + 2],
    );
  }

  getScaleAt(index) {
    const a = this.geometry.attributes.instanceScale;
    return new THREE.Vector3(
      a.array[index * a.itemSize + 0],
      a.array[index * a.itemSize + 1],
      a.array[index * a.itemSize + 2],
    );
  }

  /**
   * @TODO
   */
  getRotationAt(index) {
    const a = this.geometry.attributes.instanceQuaternion;
    return new THREE.Quaternion(
      a.array[index * a.itemSize + 0],
      a.array[index * a.itemSize + 1],
      a.array[index * a.itemSize + 2],
      a.array[index * a.itemSize + 3],
    );
  }

  /**
   * @TODO
   */
  getPickingColorAt(index) {
    const a = this.geometry.attributes.instancePickingColor;
    return new THREE.Vector3(
      a.array[index * a.itemSize + 0],
      a.array[index * a.itemSize + 1],
      a.array[index * a.itemSize + 2],
    );
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

  setPickingColorAt(index, pickingColor) {
    this.geometry.attributes.instancePickingColor.setXYZ(index, pickingColor.x, pickingColor.y, pickingColor.z);
  }
}

export default Cluster;
