import Metric from "./Metric";

/**
 * Food metric
 * @extends Metric
 */
export default class Food extends Metric {
  constructor(){
    super({
      name: "Food",
      displayName: "Nourriture",
      min: 0,
      max: 100,
      value: 100,
      recurentOperation: 0.1,
    })
  }
}
