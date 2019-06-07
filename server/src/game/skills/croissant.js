import { Skill } from '../../../reborn';

export default class CroissantSkill extends Skill {
  start(skill, game) {
    const isStarted = super.start();
    if (!isStarted) return;
    const foodMetric = game.metrics.get('food');
    const callback = () => {
      foodMetric.value += foodMetric.value * 0.02;
    };
    game.timeline.on('tick', callback);
    setTimeout(() => game.timeline.off('tick', callback), this.duration);
  }
}
