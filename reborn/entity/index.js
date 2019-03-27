import uuidGenerator from "../utils/uuid";
import Emitter from "./../utils/Emitter";

/**
 * @param {String} uuid Unique ID 
 * @param {{x: Number, y: Number}} position The position in the grid
 * @param {Model} model A model that describe how the entity work
 * @param {[States]} states The current states of an entity
 */
export default class Entity extends Emitter {
  constructor({
    uuid = uuidGenerator(),
    position = null,
    model = null,
    states = new Map()
  }){
    super();
    this.uuid = uuid;
    this.position = position;
    this.model = model;
    if (this.model === null) return null;
    if (this.position === null) return null;
    this.states = states;
    
    this.create();
  }

  create(){
    this.addState('living');

    // If creation state
    if( this.model.stateExist('creation')) {

      this.on('add_state:creation', (creationState) => {
        this.once('remove_state:creation', () => {
          this.mount();
        })
  
        // If there is a duration (wait and remove state)
        if (creationState.duration >= 0) {
          setTimeout(() => {
            this.removeState('creation');
          }, creationState.duration);
          return;
        }
        // Else remove state just after
        this.removeState('creation');
      })

      this.addState('creation');
      return;
    }
    this.mount();
  }

  mount() {
    this.removeState('creation', true);
    if( this.model.stateExist('mounted')) {
      this.on('add_state:mounted', ()=>{
        this.once('remove_state:mounted', () => {
          this.destruct();
        })
      });
      this.addState('mounted');
      return;
    }
    this.destruct();
  }

  destruct() {
    // If state destruction is available
    this.removeState('mounted', true);
    this.removeState('creation', true);
    if( this.model.stateExist('destruction')) {
      this.on('add_state:destruction', (destructionState)=>{
        this.once('remove_state:destruction', () => {
          this.removeAllState();
        })

        // If there is a duration (wait and remove state)
        if (destructionState.duration >= 0) {
          setTimeout(() => {
            this.removeState('destruction');
          }, destructionState.duration);
          return;
        }

        // Else instantly remove destruction state
        this.removeState('destruction');
      });

      this.addState('destruction');
      return;
    }

    // Else directly remove all states
    this.removeAllState();
  }

  removeAllState(){
    // In this specific order
    this.removeState('living', true);
    this.removeState('destruction', true);
    this.removeState('mounted', true);
    this.removeState('creation', true);
  }

  addState(slug, discret = false){
    var state = this.model.states[slug];
    if (state && !this.states.has(slug)) {
      console.log('add state', slug);
      this.states.set(slug, state);
      console.log(this.states.keys())
      state.enter(this.model.game);
      if (!discret) {
        this.emit(`add_state:${state.name}`, state);
      }
      return state;
    }
  }

  removeState(slug, discret = false){
    var state = this.states.get(slug);
    if (state) {
      console.log('remove state', slug);
      state.leave(this.model.game);
      this.states.delete(slug);
      console.log(this.states.keys())
      if (!discret) {
        this.emit(`remove_state:${state.name}`, state);
      }
      return; 
    }
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