import Metric from "./Metric";

/**
 * Pollution metric
 * @extends Metric
 */
export default class Pollution extends Metric {
  constructor(){
    super({
      name: "Pollution",
      min: 0,
      max: 100,
      value: 0,
      recurentOperation: 0.1
    })
  }
}