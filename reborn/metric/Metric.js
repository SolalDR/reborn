import Emitter from "../utils/Emitter";
import snakeCase from "../utils/snakeCase";

/**
 * @class
 * @param {String} name The name of the metric as it will be displayed in ui
 * @param {String} slug The slug of the metric (if not defined, the name of the metric will be converted to snake case)
 * @param {Number} value Initial value of the metric
 * @param {Number} min Minimum value of the metric
 * @param {Number} max Maximum value of the metric
 * @param {Number} recurentOperation A number that will be added on each tick of the timeline
 */
class Metric extends Emitter {
  constructor({
    name = null,
    slug = null,
    value = null,
    min = null,
    max = null,
    recurentOperation = 0,
    inclusiveSet = true
  }){
    super();
    this.name = name;
    this.slug = slug === null ? snakeCase(name) : slug;
    this.recurentOperation = recurentOperation;
    this.min = min;
    this.max = max;
    this.value = value;
    this.inclusiveSet = inclusiveSet;
  }

  /**
   * Setter of "value", clamp the value based on his limit
   */
  set value(value){
    if(isNaN(value)) return;
    var tmpValue = value;
    if (this.max !== null) tmpValue = Math.min(this.max, tmpValue);
    if (this.min !== null) tmpValue = Math.max(this.min, tmpValue);
    this._value = tmpValue;
    this.checkLimit();
  }

  get value(){
    return this._value;
  }

  get infos() {
    return {
      value: this.value,
      name: this.name,
      slug: this.slug,
      recurentOperation: this.recurentOperation,
    }
  }

  update(infos) {
    this.value = infos.value;
    this.recurentOperation = infos.recurentOperation;
  }

  /**
   * Check if a limit is reached and fire an event if it does
   * @returns {Boolean}
   */
  checkLimit(value = this._value, discret = false){
    if (
      this.inclusiveSet
      ? value <= this.min|| value >= this.max
      : value < this.min|| value > this.max
      ) {
      if (!discret) {
        this.emit('limitreached', this);
      }
      return true;
    }
    return false;
  }
}

Metric.LIST = ['purity', 'bio_diversity', 'satisfaction', 'energy', 'alimentation', 'population', 'money'];

export default Metric;
export {default as Modifier} from "./Modifier";
