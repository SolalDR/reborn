import EntityState from "./State";
import snakeCase from "./../utils/snakeCase";

/**
 * @param {String} name The name of the model as it will be displayed in ui
 * @param {String} slug The slug of the model (if not defined, the name of the metric will be converted to snake case)
 * @param {Number} health
 * @param {{x: Number, y: Number}} size A 2d vector which define the size an entity will take on the grid
 * @param {{State}} states A object that describe the different state
 * @param {Game} game
 */
export default class EntityModel {
  constructor({
    name = null,
    slug = null,
    game = null,
    health = 100,
    size = {x: 1, y: 1},
    states = {},
  }){
    this.name = name;
    this.slug = slug === null ? snakeCase(name) : slug;
    this.game = game;
    this.health = health;
    this.size = size;

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
  stateExist(name){
    return !!this.states[name];
  }
}