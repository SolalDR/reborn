import Metric from "./index";

/**
 * @param {String} name The name of the metric
 * @param {Number} value
 */
export default class MetricModifier {
  constructor({
    name = null,
    value = null
  }){
    if (Metric.LIST.indexOf(name) < 0) {
      console.error(`MetricModifier: The metric with name "${name}" is not defined`);
      return null;
    }

    if (isNaN(value)) {
      console.error(`MetricModifier: The metric with name "${name}" is not defined`);
      return null;
    }

    this.name = name;
    this.value = value;
  }

  /**
   * Apply the modifier
   * @param {Number} entry
   * @returns {Number}
   */
  apply(entry) {
    entry += this.value;
    return entry;
  }

  /**
   * Unapply the modifier
   * @param {Number} entry
   * @returns {Number}
   */
  unapply(entry){
    entry -= this.value;
    return entry;
  }
}
