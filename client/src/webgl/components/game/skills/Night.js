import Skill from "./Skill";
import Reborn from '@/game';
import animate from "@solaldr/animate";
import theme from "@/config/theme";

export default class Night {
  launch({duration}, $webgl) {
    if ($webgl.game.player.role.name === "nature") return;

    var fromAmbient = theme.light.ambient;
    var fromDirectional = theme.light.directional;
    var fromAmbientColor = $webgl.ambientLight.color.clone();
    var toAmbientColor = new THREE.Color(0, 0.16078431372, 1);

    animate.add({
      duration: 2000
    }).on('progress', ({ value }) => {
      $webgl.ambientLight.intensity = THREE.Math.lerp(fromAmbient.intensity, 0.15, value);
      $webgl.directionalLight.intensity = THREE.Math.lerp(fromDirectional.intensity, 0, value);
      $webgl.ambientLight.color.setRGB(
        THREE.Math.lerp(fromAmbientColor.r, toAmbientColor.r, value),
        THREE.Math.lerp(fromAmbientColor.g, toAmbientColor.g, value),
        THREE.Math.lerp(fromAmbientColor.b, toAmbientColor.b, value)
      );
    })

    setTimeout(() => {
      animate.add({
        duration: 1000
      }).on('progress', ({ value }) => {
        $webgl.ambientLight.intensity = THREE.Math.lerp(0.15, fromAmbient.intensity, value);
        $webgl.directionalLight.intensity = THREE.Math.lerp(0, fromDirectional.intensity, value);
        $webgl.ambientLight.color.setRGB(
          THREE.Math.lerp(toAmbientColor.r, fromAmbientColor.r, value),
          THREE.Math.lerp(toAmbientColor.g, fromAmbientColor.g, value),
          THREE.Math.lerp(toAmbientColor.b, fromAmbientColor.b, value)
        );
      })
    }, duration );
  }
}
