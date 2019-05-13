import Metric from "./Metric";

/**
 * Energy metric
 * @extends Metric
 */
export default class Energy extends Metric {
  constructor(){
    super({
      name: "Energy",
      min: 0,
      max: 100,
      value: 30,
      recurentOperation: 0,
    })
  }

  applyRecurentLogic(game) {
    this.value -= game.metrics.get('population').value * 0.001;
  }
}
