import Metric from "./Metric";

/**
 * Money metric
 * @extends Metric
 */
export default class Money extends Metric {
  constructor(){
    super({
      name: "Money",
      displayName: "Ressources",
      min: 0,
      max: Infinity,
      value: 10000,
      recurentOperation: -200,
      inclusiveSet: false,
    })
  }
}
