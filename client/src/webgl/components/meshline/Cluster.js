import Cluster from '../cluster';

export default class LineCluster extends Cluster {
  /**
   * @override
   */
  setupMaterial() {
    this.material.onBeforeCompile = (program) => {
      // program.vertexShader = `${beforeVertexChunk}\n\r${program.vertexShader}`;

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
  }
}
