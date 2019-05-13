import Metric from "./Metric";

/**
 * Biodiversity metric
 * @extends Metric
 */
export default class Biodiversity extends Metric {
  constructor(){
    super({
      name: "Biodiversity",
      min: 0,
      max: 100,
      value: 50,
      recurentOperation: 0.5,
    })
  }
}
