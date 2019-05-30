import Emitter from "./../utils/Emitter";
import snakeCase from "./../utils/snakeCase";

/**
 * @class
 */
class Skill extends Emitter {
  /**
   * [constructor description]
   * @param  {String} options.name             Name of the skill
   * @param  {String} options.slug             Slug auto generate if not mentionned
   * @param  {String} options.role             Role assigned to the user
   * @param  {Number} options.duration
   * @param  {Number} options.durationInterval [description]
   * @property {boolean} allowedConstraint true if attached constraint is verified
   * @property {boolean} refill true if the duration between started and current time is greater than durationInterval
   */
  constructor({
    name = "",
    slug = "",
    role = "nature",
    duration = 1000,
    durationInterval = 60000,
    constraint = "",
    regularConstraintOrder = true,
    category = null,
    zoneRadius = 0
  } = {}) {
    super();
    this.name = name;
    this.category = category;
    this.slug = slug === "" ? snakeCase(name) : slug;
    this.role = role;
    this.duration = duration;
    this.durationInterval = durationInterval;
    this.constraint = constraint;
    this.regularConstraintOrder = !!regularConstraintOrder;

    this.startedAt = 0;
    this.refill = true;
    this.allowedConstraint = false;
  }

  start() {
    if (!this.isAvailable) return;
    this.startedAt = Date.now();
    this.refill = false;
    this.emit('start', {
      startedAt: this.startedAt,
      availableAt: this.startedAt + this.durationInterval,
    });

    setTimeout(()=>{
      this.refill = true;
      this.checkAvailable();
    }, this.durationInterval)
  }

  get isRefill() {
    return Date.now() > this.startedAt + this.durationInterval ? true : false;
  }

  checkAvailable(discret = false) {
    const available = this.refill && this.allowedConstraint;
    if (!discret) {
      this.emit(available ? 'available' : 'unavailable');
    }
    return available;
  }

  get available() {
    return this.checkAvailable(true);
  }
}

export default Skill;
