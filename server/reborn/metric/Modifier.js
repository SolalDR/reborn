import Metric from './Metric';

/**
 * @deprecated
 * @param {String} name Name of the metric
 * @param {Number} value
 */
export default class MetricModifier {
  constructor({
    name = null,
    value = null,
  }) {
    if (Metric.LIST.indexOf(name) < 0) {
      console.error(`MetricModifier: The metric with name "${name}" is not defined`);
      return null;
    }

    if (typeof value !== 'number') {
      console.error('MetricModifier: value must be a number');
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
  unapply(entry) {
    entry -= this.value;
    return entry;
  }
}
