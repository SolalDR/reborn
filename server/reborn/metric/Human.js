import Metric from "./Metric";

/**
 * Energy metric
 * @extends Metric
 */
export default class Human extends Metric {
  constructor(){
    super({
      name: "Human",
      displayName: "Human",
      slug: 'human',
      min: 0,
      max: 100,
      value: 36.6666,
      recurentOperation: 0,
    })
  }

  applyRecurentLogic(game) {
    this.value = (
      game.metrics.get('food').value
      + game.metrics.get('satisfaction').value
      + game.metrics.get('energy').value
    ) / 3;
  }
}
