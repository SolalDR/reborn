import { Skill } from '../../../reborn';

export default class EpidemicSkill extends Skill {
  start(item, game) {
    const isStarted = super.start();
    if (!isStarted) return;
    const populationMetric = game.metrics.get('population');
    const callback = () => {
      populationMetric.value -= populationMetric.value * 0.01;
    };
    game.timeline.on('tick', callback);
    setTimeout(() => game.timeline.off('tick', callback), this.duration);
  }
}
