/**
 * @class Represent a state in the lifecycle of an Entity. It is the way to apply modification on the metrics.
 * @param {String} name The name availables are 'creation', 'mounted', 'destruction', 'living'
 * @param {Number|null} duration The duration before the state will be expired. If no duration is specified the state stay
 * @param {{name: String, value: Number, checkBefore: Boolean}} enterModifiers
 * @param {{name: String, value: Number, checkBefore: Boolean}} recurModifiers
 * @param {{name: String, value: Number, checkBefore: Boolean}} leaveModifiers
 */
class EntityState {
  constructor({
    name = null,
    duration = null,
    enterModifiers = [],
    recurModifiers = [],
    leaveModifiers = [],
  }) {
    this.name = name;
    this.duration = duration;
    if (EntityState.LIST.indexOf(this.name) < 0) {
      console.error(`EntityState: The state with name "${this.name}" is not defined`);
      return null;
    }

    this.enterModifiers = enterModifiers;
    this.recurModifiers = recurModifiers;
    this.leaveModifiers = leaveModifiers;
  }

  /**
   * Enter the state: execute enter modifiers, modify recurent operation in metrics
   * @param {Reborn.Game} game
   * @todo Check if checkBefore exist
   * @returns {null}
   */
  enter(game) {
    this.enterModifiers.forEach((modifier) => {
      const metric = game.metrics.get(modifier.name);
      if (metric) {
        metric.value += modifier.value;
      }
    });

    this.recurModifiers.forEach((modifier) => {
      const metric = game.metrics.get(modifier.name);
      if (metric) {
        const timeScaledValue = modifier.value * (game.timeline.interval / 1000);
        metric.recurentOperation += timeScaledValue;
      }
    });
  }

  /**
   * Leave the state: execute leave modifiers discard recurent operation in metrics
   * @param {Reborn.Game} game
   * @returns {null}
   */
  leave(game) {
    this.leaveModifiers.forEach((modifier) => {
      const metric = game.metrics.get(modifier.name);
      if (metric) {
        metric.value += modifier.value;
      }
    });

    this.recurModifiers.forEach((modifier) => {
      const metric = game.metrics.get(modifier.name);
      if (metric) {
        const timeScaledValue = modifier.value * (game.timeline.interval / 1000);
        metric.recurentOperation -= timeScaledValue;
      }
    });
  }
}

EntityState.LIST = ['creation', 'mounted', 'destruction', 'living'];

export default EntityState;
