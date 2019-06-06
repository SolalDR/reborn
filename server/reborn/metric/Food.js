import Metric from "./Metric";

/**
 * Food metric
 * @extends Metric
 */
export default class Food extends Metric {
  constructor(){
    super({
      name: "Food",
      displayName: "Nourriture",
      slug: 'food',
      min: 0,
      max: 100,
      value: 50,
      recurentOperation: 0.05,
    })
  }

  applyRecurentLogic(game) {
    this.value -= game.metrics.get('population').value * 0.0005;
  }
}
