import Metric from "./Metric";
import models from "../entity/models";

/**
 * Energy metric
 * @extends Metric
 */
export default class Rock extends Metric {
  constructor(){
    super({
      name: "Rock",
      displayName: "Roches",
      slug: 'rock',
      min: 0,
      value: 0,
      recurentOperation: 0,
    })

    this.list = models.reduce((acc, model) => {
      if (model.category == 'rock') {
        acc.push(model.slug);
      }
      return acc;
    }, [])
  }

  applyRecurentLogic(game) {
    this.value = this.list.reduce((value, model) => {
      return value + game.entityModels.get(model).count
    }, 0)
  }
}
