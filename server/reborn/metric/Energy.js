import Metric from "./Metric";

/**
 * Energy metric
 * @extends Metric
 */
export default class Energy extends Metric {
  constructor(){
    super({
      name: "Energy",
      displayName: "Énergie",
      slug: 'energy',
      min: 0,
      max: 100,
      value: 50,
      recurentOperation: 0,
    })
  }

  applyRecurentLogic(game) {
    this.value -= game.metrics.get('population').value * 0.0005;
    this.value = 100;
  }
}
