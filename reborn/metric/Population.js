import Metric from "./Metric";

/**
 * Population metric
 * @extends Metric
 */
export default class Population extends Metric {
  constructor(){
    super({
      name: "Population",
      displayName: "Population",
      min: 0,
      max: 100,
      value: 100,
      recurentOperation: 0.1
    })
  }
}
