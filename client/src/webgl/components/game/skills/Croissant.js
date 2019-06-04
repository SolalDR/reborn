import Skill from "./Skill";
import Reborn from '@/game';
import animate from "@solaldr/animate";
import theme from "@/config/theme";

export default class Croissant {
  launch({duration}, $webgl) {
    var fromAmbient = theme.light.ambient;
    var fromDirectional = theme.light.directional;

    var fromPosition = $webgl.directionalLight.position.clone();
    var toPosition = new THREE.Vector3(0, 15, 5);
    animate.add({
      duration: 2000
    }).on('progress', ({ value }) => {
      $webgl.ambientLight.intensity = THREE.Math.lerp(fromAmbient.intensity, 0.75, value);
      $webgl.directionalLight.intensity = THREE.Math.lerp(fromDirectional.intensity, 0.75, value);
      $webgl.directionalLight.position.lerpVectors(fromPosition, toPosition, value);
    });

    setTimeout(() => {
      animate.add({
        duration: 1000
      }).on('progress', ({ value }) => {
        $webgl.ambientLight.intensity = THREE.Math.lerp(0.75, fromAmbient.intensity, value);
        $webgl.directionalLight.intensity = THREE.Math.lerp(0.75, fromDirectional.intensity, value);
        $webgl.directionalLight.position.lerpVectors(toPosition, fromPosition, value);
      });
    }, duration );
  }
}
