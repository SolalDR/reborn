import uuid from "../utils/uuid";

/**
 * @param {String} uuid Unique ID 
 * @param {{x: Number, y: Number}} position The position in the grid
 * @param {Model} model A model that describe how the entity work
 * @param {[States]} states The current states of an entity
 */
export default class Entity {
  constructor({
    uuid = uuid(),
    position = null,
    model = null,
    states = new Map()
  }){
    this.uuid = uuid;
    this.position = position;
    this.model = model;
    if (this.model === null) return null;
    if (this.position === null) return null;

    this.states = states;
  }

  addState(slug){
    var state = this.model.states[slug];
    if (state) {
      this.states.set(slug, state);
      return;
    }
    console.error(`Entity: Cannot add state "${slug}" on model "${this.model.slug}"`);
  }

  removeState(slug){
    this.states.delete(slug);
  }

  /**
   * Return infos on entity to log it or add a message to the history
   * @return {string} The description of the entity
   */
  log() {
    return `Entity: ${Array.from(this.states.keys())}, position: ${this.position}, model: ${this.model.slug}`;
  }

  infos(){
    return {
      uuid: this.uuid,
      position: this.position,
      model: this.model.slug,
      states: Array.from(this.states.keys())
    }
  }
}