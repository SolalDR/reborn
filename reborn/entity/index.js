import uuidGenerator from "../utils/uuid";

/**
 * @param {String} uuid Unique ID 
 * @param {{x: Number, y: Number}} position The position in the grid
 * @param {Model} model A model that describe how the entity work
 * @param {[States]} states The current states of an entity
 */
export default class Entity {
  constructor({
    uuid = uuidGenerator(),
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

    this.addState('creation');
    this.addState('living');
  }

  destroy(){
    this.states.forEach((_, slug) => {
      this.removeState(slug);
    })
  }

  addState(slug){
    var state = this.model.states[slug];
    if (state && !this.states.has(slug)) {
      this.states.set(slug, state);
      state.enter(this.model.game);
      return state;
    }
    console.error(`Entity: Cannot add state "${slug}" on model "${this.model.slug}"`);
  }

  removeState(slug){
    var state = this.states.get(slug);
    if (state) {
      state.leave(this.model.game);
      this.states.delete(slug);
      return; 
    }
    console.error(`Entity: Cannot found and remove state "${slug}"`);
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