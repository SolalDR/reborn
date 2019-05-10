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
      value: 100,
      recurentOperation: 0.1
    })
  }
}
