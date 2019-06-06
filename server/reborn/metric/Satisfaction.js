import Metric from "./Metric";

/**
 * Satisfaction metric
 * @extends Metric
 */
export default class Satisfaction extends Metric {
  constructor() {
    super({
      name: "Satisfaction",
      displayName: "Satisfaction",
      slug: 'satisfaction',
      min: 0,
      max: 100,
      value: 50,
      recurentOperation: -1,
    })
  }

  applyRecurentLogic(game) {
    var intensityAlimentation = game.metrics.get('food').value / 100;
    var intensityEnergie = game.metrics.get('energy').value / 100;

    // this.value *= (minRatio + (maxRatio - minRatio)*intensity);
  }
}
