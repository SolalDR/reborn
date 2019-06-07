import Emitter from './utils/Emitter';
import Grid from './Grid';
import Entity from './entity';

/**
 * @class Represent a physic environnement
 * @property {Map} entities
 * @property {Grid} grid
 * @extends Emitter
 */
export default class World extends Emitter {
  constructor({
    game = null,
  } = {}) {
    super();
    this.game = game;
    this.entities = new Map();
    this.grid = new Grid();
  }

  /**
   * Add an entity
   * @param {String} model
   * @param {{x: Number, y: Number}} position
   * @returns {Entity}
   */
  addEntity({
    gridCases = [],
    model = null,
    position = null,
    rotation = null,
  } = {}) {
    const entityModel = this.game.entityModels.get(model);
    if (!entityModel) {
      console.error(`World: Cannot add entity with model "${model}"`); return null;
    }

    if (!this.grid.checkCells(gridCases)) {
      console.error('World: Cannot add entity at this place'); return null;
    }

    const newEntity = new Entity({
      position,
      rotation,
      model: entityModel,
    });

    if (!newEntity.valid) return null;
    const gridCasesCertified = this.grid.registerCells(gridCases, newEntity.uuid);
    newEntity.gridCases = gridCasesCertified;


    this.entities.set(newEntity.uuid, newEntity);
    this.emit('entity:add', newEntity.infos);
    entityModel.count++;
    newEntity.on('update', (infos) => {
      this.emit('entity:update', infos);
    });

    return newEntity;
  }

  get entitiesList() {
    return Array.from(this.entities.values());
  }

  /**
   * Remove an entity
   * @param {Entity} entity
   * @returns {void}
   */
  removeEntity(entity) {
    if (!entity) {
      console.error('World: Cannot remove entity "null"'); return;
    }

    entity.destruct();
    entity.model.count--;
    this.entities.delete(entity.uuid);
    this.emit('entity:remove', entity.infos);
  }
}
