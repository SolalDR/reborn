import Cluster from '../cluster';
import beforeVertexChunk from '../cluster/include_vertex.glsl';

export default class LineCluster extends Cluster {
  setupInstanceGeometry() {
    super.setupInstanceGeometry();
    const dashOffsetBuffer = new Float32Array(this.limit);

    for (let i = 0; i < this.limit; i += 1) {
      this.availables[i] = i;
      dashOffsetBuffer[i] = 0;
    }

    this.geometry.addAttribute(
      'instanceDashOffset',
      new THREE.InstancedBufferAttribute(dashOffsetBuffer, 1, false),
    );

    this.geometry.attributes.instanceDashOffset.setDynamic(this.dynamic);
  }

  setupMaterial() {
    this.material.onBeforeCompile = (program) => {
      program.vertexShader = `${beforeVertexChunk}\n\r${program.vertexShader}`;
      program.vertexShader = program.vertexShader.replace(
        'attribute vec3 instancePosition;',
        `attribute vec3 instancePosition;
         attribute float instanceDashOffset;
         varying float vDashOffset;`,
      );
      program.vertexShader = program.vertexShader.replace(
        'mat4 m = projectionMatrix * modelViewMatrix;',
        `mat4 _instanceMatrix = getInstanceMatrix();
        vDashOffset = instanceDashOffset;
        mat4 m = projectionMatrix * modelViewMatrix * _instanceMatrix;`,
      );

      program.fragmentShader = `varying float vDashOffset;\n\r${program.fragmentShader}`;
      program.fragmentShader = program.fragmentShader.replace(
        'c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));',
        [
          'float offset = dashOffset + vDashOffset;',
          '#ifdef MIN_OFFSET',
          'offset = max(offset, minOffset);',
          '#endif',
          '#ifdef MAX_OFFSET',
          'offset = min(offset, maxOffset);',
          '#endif',
          'c.a *= ceil(mod(vCounters + offset, dashArray) - (dashArray * dashRatio));',
        ].join('\n\r'),
      );
    };
  }

  addItem({
    dashOffset = 0,
  } = {}) {
    const index = super.addItem(...arguments);

    if (index && !Number.isNaN(dashOffset)) {
      this.setDashOffsetAt(index, dashOffset);
      this.geometry.attributes.instanceDashOffset.needsUpdate = true;
      return index;
    }
    return null;
  }

  setDashOffsetAt(index, value) {
    this.geometry.attributes.instanceDashOffset.setX(index, value);
  }

  get dashOffset() {
    return this.material.uniforms.dashOffset.value;
  }

  set dashOffset(value) {
    this.material.uniforms.dashOffset.value = value;
  }

  initGUI(folder) {
    folder.add(this.material.uniforms.dashOffset, 'value').name('dashOffset');
    folder.add(this.material.uniforms.dashArray, 'value').name('dashArray');
    folder.add(this.material.uniforms.dashRatio, 'value').name('dashRatio');
    folder.add(this.material.uniforms.lineWidth, 'value').name('lineWidth');
  }
}
