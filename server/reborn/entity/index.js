import uuidGenerator from '../utils/uuid';
import Emitter from '../utils/Emitter';

/**
 * @class Describe an entity based on a model
 * @param {String} uuid A Unique ID, auto generated if not defined
 * @param {{x: Number, y: Number}} position The position on the grid
 * @param {EntityModel} model A model that describe how the entity work
 * @param {States[]} states The activated states of the entity
 */
export default class Entity extends Emitter {
  constructor({
    uuid = uuidGenerator(),
    position = null,
    rotation = null,
    model = null,
    states = new Map(),
  }) {
    super();
    this.uuid = uuid;
    this.position = position;
    this.rotation = rotation;
    this.model = model;
    this.valid = true;
    this.gridCases = [];
    if (this.model === null) return null;
    if (this.position === null) return null;
    this.states = states;

    this.create();
  }

  checkConstraint(modifiers) {
    let constrained = false;
    modifiers.forEach((modifier) => {
      if (modifier.checkConstraint) {
        const metric = this.model.game.metrics.get(modifier.name);
        if (metric.checkLimit(metric.value + modifier.value, true)) {
          constrained = true;
        }
      }
    });

    return constrained;
  }

  /**
   * Enter the states "creation" and "living"
   * When the state creation is passed, it run Entity::mount()
   * @returns {void}
   */
  create() {
    if (this.checkConstraint(this.model.states.creation.enterModifiers)) {
      this.valid = false;
      return null;
    }

    // If creation state
    if (this.model.hasState('creation')) {
      this.on('add_state:creation', (creationState) => {
        this.once('remove_state:creation', () => {
          this.mount();
        });

        // If there is a duration (wait and remove state)
        if (creationState.duration >= 0) {
          setTimeout(() => {
            this.removeState('creation');
          }, creationState.duration);
          return null;
        }
        // Else remove state just after
        this.removeState('creation');
      });

      this.addState('living');
      this.addState('creation');
    }

    this.mount();

    return null;
  }

  /**
   * Enter the states "mounted". If state "creation" still active, remove the state "creation"
   * When the state mounted is removed, it run Entity::destruct()
   * @returns {void}
   */
  mount() {
    this.removeState('creation', true);
    if (this.model.hasState('mounted')) {
      this.on('add_state:mounted', () => {
        this.once('remove_state:mounted', () => {
          this.destruct();
        });
      });
      this.addState('mounted');
      return;
    }
    this.destruct();
  }

  /**
   * Enter the states "destruction". If state "creation" or "mounted" are still activated, remove the states
   * When the state destruction is removed, it run Entity::removeAllState()
   * @returns {void}
   */
  destruct() {
    // If state destruction is available
    this.removeState('mounted', true);
    this.removeState('creation', true);
    if (this.model.hasState('destruction')) {
      this.on('add_state:destruction', (destructionState) => {
        this.once('remove_state:destruction', () => {
          this.removeAllState();
        });

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

  /**
   * Remove all the states of the entity
   */
  removeAllState() {
    // In this specific order
    this.removeState('living', true);
    this.removeState('destruction', true);
    this.removeState('mounted', true);
    this.removeState('creation', true);

    this.destroy();
  }

  /**
   * Add a state to an entity if it is defined in the model.
   * @param {String} name The name of the state
   * @param {Boolean} discret If true, the state will be added without firing an event
   * @return {null|EntityState}
   */
  addState(name, discret = false) {
    const state = this.model.states[name];
    if (state && !this.states.has(name)) {
      this.states.set(name, state);
      state.enter(this.model.game);
      if (!discret) {
        this.emit('update', this.infos);
        this.emit(`add_state:${state.name}`, state);
      }
      return state;
    }
    return null;
  }

  /**
   * Remove a state of an entity
   * @param {String} name The name of the state
   * @param {Boolean} discret If true, the state will be removed without firing an event
   * @return {void|EntityState}
   */
  removeState(name, discret = false) {
    const state = this.states.get(name);
    if (state) {
      state.leave(this.model.game);
      this.states.delete(name);
      if (!discret) {
        this.emit('update', this.infos);
        this.emit(`remove_state:${state.name}`, state);
      }
    }
  }

  destroy() {
    this.gridCases.forEach((gridCase) => {
      gridCase.reference = null;
    });
    this.emit('destroy');
  }

  /**
   * Return infos on entity to log it or add a message to the history
   * @return {string} The description of the entity
   */
  log() {
    return `states: ${Array.from(this.states.keys())}, position: ${this.position}, model: ${this.model.slug}`;
  }

  /**
   * Return infos on entity to send it to the socket
   * @return {Object} THe description of the entity
   */
  get infos() {
    return {
      uuid: this.uuid,
      position: this.position,
      rotation: this.rotation,
      model: this.model.slug,
      states: Array.from(this.states.keys()),
      gridCases: this.gridCases.map(g => g.infos),
    };
  }
}
