/* eslint-disable */
import animate from '@solaldr/animate';
import theme from '@/config/theme';

export default class Night {
  launch({ duration }, $webgl) {
    const intensityAmbient = $webgl.game.player.role.name === 'nature' ? 0.3 : 0.15;
    const intensityDirectional = $webgl.game.player.role.name === 'nature' ? 0.3 : 0;
    const fromAmbient = theme.light.ambient;
    const fromDirectional = theme.light.directional;
    const fromAmbientColor = $webgl.ambientLight.color.clone();
    const toAmbientColor = new THREE.Color(0, 0.16078431372, 1);

    animate.add({
      duration: 2000,
      timingFunction: "easeOutCubic",
    }).on('progress', ({ value }) => {
      $webgl.ambientLight.intensity = THREE.Math.lerp(fromAmbient.intensity, intensityAmbient, value);
      $webgl.directionalLight.intensity = THREE.Math.lerp(fromDirectional.intensity, intensityDirectional, value);
      $webgl.ambientLight.color.setRGB(
        THREE.Math.lerp(fromAmbientColor.r, toAmbientColor.r, value),
        THREE.Math.lerp(fromAmbientColor.g, toAmbientColor.g, value),
        THREE.Math.lerp(fromAmbientColor.b, toAmbientColor.b, value),
      );
    });

    setTimeout(() => {
      animate.add({
        duration: 1000,
        timingFunction: "easeInCubic",
      }).on('progress', ({ value }) => {
        $webgl.ambientLight.intensity = THREE.Math.lerp(intensityAmbient, fromAmbient.intensity, value);
        $webgl.directionalLight.intensity = THREE.Math.lerp(intensityDirectional, fromDirectional.intensity, value);
        $webgl.ambientLight.color.setRGB(
          THREE.Math.lerp(toAmbientColor.r, fromAmbientColor.r, value),
          THREE.Math.lerp(toAmbientColor.g, fromAmbientColor.g, value),
          THREE.Math.lerp(toAmbientColor.b, fromAmbientColor.b, value),
        );
      });
    }, duration);
  }
}
