import Metric from "./Metric";

/**
 * Biodiversity metric
 * @extends Metric
 */
export default class Biodiversity extends Metric {
  constructor(){
    super({
      name: "Biodiversity",
      displayName: "Biodiversité",
      min: 0,
      max: 100,
      value: 100,
      recurentOperation: 0.1,
    })
  }
}
