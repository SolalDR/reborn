import animate from '@solaldr/animate';
import theme from '@/config/theme';
import AssetsManager from '@/services/assets/Manager';
import { GodRay } from '../../world';

export default class Croissant {
  constructor($webgl) {
    this.scene = $webgl.scene;
    AssetsManager.get('images').then((images) => {
      this.godRay = new GodRay({
        path: images.straight_line.paths[0],
        maxOffset: 2,
        minOffset: -2,
        dashOffset: 2,
      });
    });
  }

  launch({ duration }, $webgl) {
    const fromAmbient = theme.light.ambient;
    const fromDirectional = theme.light.directional;
    const fromPosition = $webgl.directionalLight.position.clone();
    const toPosition = new THREE.Vector3(0, 15, 5);
    this.godRay.mesh.material.uniforms.dashOffset.value = 2;
    this.scene.add(this.godRay.mesh);

    animate.add({
      duration: 2000,
    }).on('progress', ({ value }) => {
      $webgl.ambientLight.intensity = THREE.Math.lerp(fromAmbient.intensity, 0.75, value);
      $webgl.directionalLight.intensity = THREE.Math.lerp(fromDirectional.intensity, 0.75, value);
      $webgl.directionalLight.position.lerpVectors(fromPosition, toPosition, value);
    });

    animate.add({
      duration: duration + 2000,
      from: 2,
      to: -4,
    }).on('progress', ({ value }) => {
      this.godRay.mesh.material.uniforms.dashOffset.value = value;
    }).on('end', () => {
      this.scene.remove(this.godRay.mesh);
    });

    setTimeout(() => {
      animate.add({
        duration: 1000,
      }).on('progress', ({ value }) => {
        $webgl.ambientLight.intensity = THREE.Math.lerp(0.75, fromAmbient.intensity, value);
        $webgl.directionalLight.intensity = THREE.Math.lerp(0.75, fromDirectional.intensity, value);
        $webgl.directionalLight.position.lerpVectors(toPosition, fromPosition, value);
      });
    }, duration);
  }
}
