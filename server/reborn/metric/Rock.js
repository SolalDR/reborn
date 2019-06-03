import Metric from "./Metric";

/**
 * Energy metric
 * @extends Metric
 */
export default class Rock extends Metric {
  constructor(){
    super({
      name: "Rock",
      displayName: "Roches",
      min: 0,
      value: 0,
      recurentOperation: 0,
    })
  }

  applyRecurentLogic(game) {
    this.value = game.entityModels.get('rock').count
  }
}
