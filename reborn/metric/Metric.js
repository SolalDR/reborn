import Emitter from "../utils/Emitter";
import snakeCase from "../utils/snakeCase";

/**
 * @param {String} name The name of the metric as it will be displayed in ui
 * @param {String} slug The slug of the metric (if not defined, the name of the metric will be converted to snake case)
 * @param {Number} value Value of the metric
 * @param {Number} min Minimum value of the metric
 * @param {Number} max Maximum value of the metric
 */
class Metric extends Emitter {
  constructor({
    name = null,
    slug = null,
    value = null,
    min = 0,
    max = null,
    recurentOperation = 0
  }){
    super();
    this.name = name;
    this.slug = slug === null ? snakeCase(name) : slug;
    this.recurentOperation = recurentOperation;
    this.min = min;
    this.max = max;
    this.value = value;
  }

  /**
   * Setter of "value", clamp the value based on his limit
   */
  set value(value){
    if(isNaN(value)) return;
    if (this.max) value = Math.min(this.max, value);
    if (this.min) value = Math.max(this.min, value);
    this._value = value;
    this.checkLimit();
  }

  get value(){
    return this._value;
  }

  /**
   * Check if a limit is reached and fire an event if it does
   */
  checkLimit(){
    if (this._value === this.min|| this.value === this.max) {
      this.emit('limitreached', this);
      return true;
    }
    return false;
  }
}

Metric.LIST = ['pollution', 'bio_diversity', 'satisfaction', 'energy', 'alimentation', 'population', 'money'];

export default Metric;
export {default as PollutionMetric} from "./Pollution";
export {default as Modifier} from "./Modifier";