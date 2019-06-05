import animate from '@solaldr/animate';
import Skill from './Skill';
import Reborn from '@/game';
import theme from '@/config/theme';
import AssetsManager from '@/services/assets/Manager';
import { Smoke } from '../../world';

export default class Epidemic {
  constructor($webgl) {
    this.scene = $webgl.scene;
    AssetsManager.get('images').then((images) => {
      this.smoke = new Smoke({
        path: images.smoke_line.paths[0],
        maxOffset: 2,
        minOffset: -2,
        dashOffset: 2,
      });
    });
  }

  launch({ duration }, $webgl) {
    const fromAmbient = theme.light.ambient;
    const fromDirectional = theme.light.directional;
    const fromAmbientColor = $webgl.ambientLight.color.clone();
    const fromDirectionalColor = $webgl.ambientLight.color.clone();
    const toAmbientColor = new THREE.Color(0, 0.5, 0);
    const toDirectionalColor = new THREE.Color(1, 0, 0);
    this.smoke.mesh.material.uniforms.dashOffset.value = 2;
    this.scene.add(this.smoke.mesh);

    animate.add({
      duration: 2000,
    }).on('progress', ({ value }) => {
      $webgl.ambientLight.color.setRGB(
        THREE.Math.lerp(fromAmbientColor.r, toAmbientColor.r, value),
        THREE.Math.lerp(fromAmbientColor.g, toAmbientColor.g, value),
        THREE.Math.lerp(fromAmbientColor.b, toAmbientColor.b, value),
      );

      $webgl.directionalLight.color.setRGB(
        THREE.Math.lerp(fromDirectionalColor.r, toDirectionalColor.r, value),
        THREE.Math.lerp(fromDirectionalColor.g, toDirectionalColor.g, value),
        THREE.Math.lerp(fromDirectionalColor.b, toDirectionalColor.b, value),
      );
    });

    animate.add({
      duration: duration + 2000,
      from: 2,
      to: -4,
    }).on('progress', ({ value }) => {
      this.smoke.mesh.material.uniforms.dashOffset.value = value;
    }).on('end', () => {
      this.scene.remove(this.smoke.mesh);
    });

    setTimeout(() => {
      animate.add({
        duration: 1000,
      }).on('progress', ({ value }) => {
        $webgl.ambientLight.color.setRGB(
          THREE.Math.lerp(toAmbientColor.r, fromAmbientColor.r, value),
          THREE.Math.lerp(toAmbientColor.g, fromAmbientColor.g, value),
          THREE.Math.lerp(toAmbientColor.b, fromAmbientColor.b, value),
        );

        $webgl.directionalLight.color.setRGB(
          THREE.Math.lerp(toDirectionalColor.r, fromDirectionalColor.r, value),
          THREE.Math.lerp(toDirectionalColor.g, fromDirectionalColor.g, value),
          THREE.Math.lerp(toDirectionalColor.b, fromDirectionalColor.b, value),
        );
      });
    }, duration);
  }
}
