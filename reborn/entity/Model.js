import EntityState from "./State";
import snakeCase from "./../utils/snakeCase";

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
    slug = null,
    size = {x: 1, y: 1},
    states = {},
    game = null,
  }){
    this.name = name;
    this.slug = slug === null ? snakeCase(name) : slug;
    this.game = game;
    this.size = size;
    this.cluster = null;

    // TODO Convert to Map
    this.states = {};
    Object.keys(states).forEach(keyState => {
      var state = new EntityState({
        ...states[keyState],
        name: keyState
      });
      if( state) {
        this.states[keyState] = state;
      }
    })
  }

  /**
   * @param {String} name Name of the state
   * @returns {Boolean}
   */
  hasState(name){
    return !!this.states[name];
  }
}
