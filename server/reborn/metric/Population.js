import Metric from "./Metric";

/**
 * Population metric
 * @extends Metric
 */
export default class Population extends Metric {
  constructor(){
    super({
      name: "Population",
      displayName: "Population",
      slug: 'population',
      min: 0,
      max: Infinity,
      value: 100,
      recurentOperation: 0
    })
  }

  applyRecurentLogic(game) {
    var intensity = game.metrics.get('satisfaction').value/100;
    var maxRatio = 1.05;
    var minRatio = 1;

    this.value *= (minRatio + (maxRatio - minRatio)*intensity);
    this.value = Math.floor(this.value);
  }
}
