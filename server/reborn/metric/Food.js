import Metric from './Metric';

/**
 * Food metric
 * @extends Metric
 */
export default class Food extends Metric {
  constructor() {
    super({
      name: 'Food',
      displayName: 'Nourriture',
      slug: 'food',
      min: 0,
      max: 100,
      value: 30,
      recurentOperation: 0.1,
    });
  }

  applyRecurentLogic(game) {
    this.value -= game.metrics.get('population').value * 0.0005;
  }
}
