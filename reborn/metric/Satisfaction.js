import Metric from "./Metric";

/**
 * Satisfaction metric
 * @extends Metric
 */
export default class Satisfaction extends Metric {
  constructor(){
    super({
      name: "Satisfaction",
      min: 0,
      max: 100,
      value: 0,
      recurentOperation: 0.1
    })
  }
}