import EntityState from './State';
import snakeCase from '../utils/snakeCase';

/**
 * @class Describe an entity
 * @param {String} name The name of the model as it will be displayed in ui
 * @param {String} slug The slug of the model (if not defined, the name of the metric will be converted to snake case)
 * @param {{x: Number, y: Number}} size A 2d vector which define the size an entity will take on the grid
 * @param {Object<Object>} states An object that describe the different EntityState that will be created
 * @param {Game} game
 */
export default class EntityModel {
  constructor({
    name = null,
    displayName = null,
    slug = null,
    category = null,
    role = null,
    size = [1, 1],
    states = {},
    game = null,
    count = 0,
  }) {
    this.name = name;
    this.displayName = displayName;
    this.slug = slug === null ? snakeCase(name) : slug;
    this.game = game;
    this.size = size;
    this.category = category;
    this.role = role;
    this.cluster = null;
    this.count = count;

    // TODO Convert to Map
    this.states = {};

    const stateList = ['creation', 'destruction', 'mounted', 'living'];
    stateList.forEach((keyState) => {
      const state = new EntityState({
        ...(states[keyState] ? states[keyState] : {}),
        name: keyState,
      });
      if (state) {
        this.states[keyState] = state;
      }
    });
  }

  /**
   * @param {String} name Name of the state
   * @returns {Boolean}
   */
  hasState(name) {
    return !!this.states[name];
  }
}
