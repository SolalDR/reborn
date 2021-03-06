import Metric from './Metric';

/**
 * Population metric
 * @extends Metric
 */
export default class Population extends Metric {
  constructor() {
    super({
      name: 'Population',
      displayName: 'Population',
      slug: 'population',
      min: 0,
      max: Infinity,
      value: 100,
      recurentOperation: 0,
    });
    this.trueValue = this.value;
  }

  applyRecurentLogic(game) {
    const intensity = game.metrics.get('satisfaction').value / 100;
    const maxRatio = 1.0125;
    const minRatio = 1;

    this.trueValue *= (minRatio + (maxRatio - minRatio) * intensity);
    this.value = Math.floor(this.trueValue);
  }
}
