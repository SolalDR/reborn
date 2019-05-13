import Metric from "./Metric";

/**
 * Pollution metric
 * @extends Metric
 */
export default class Purity extends Metric {
  constructor(){
    super({
      name: "Pureté",
      slug: "purity",
      min: 0,
      max: 100,
      value: 50,
      recurentOperation: 0
    })
  }
}
