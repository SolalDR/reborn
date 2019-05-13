import Metric from "./Metric";

/**
 * Energy metric
 * @extends Metric
 */
export default class Energy extends Metric {
  constructor(){
    super({
      name: "Energy",
      displayName: "Énergie",
      min: 0,
      max: 100,
      value: 100,
      recurentOperation: 0.1,
    })
  }
}
