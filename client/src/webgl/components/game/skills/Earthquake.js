import Skill from './Skill';
import mouse from '@/plugins/Mouse';
import Reborn from '@/game';

export default class Earthquake {
  launch(cell, $webgl) {
    $webgl.controls.woobleAction();
  }
}
