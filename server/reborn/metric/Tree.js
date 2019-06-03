import Metric from "./Metric";

/**
 * Energy metric
 * @extends Metric
 */
export default class Tree extends Metric {
  constructor(){
    super({
      name: "Tree",
      displayName: "Arbres",
      min: 0,
      value: 0,
      recurentOperation: 0,
    })
  }

  applyRecurentLogic(game) {}
}
