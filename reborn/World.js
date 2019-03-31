import Emitter from "./utils/Emitter";
import Grid from "./Grid";
import Entity from "./entity";

/**
 * @class Represent a physic environnement
 * @property {Map} entities
 * @property {Grid} grid
 * @extends Emitter
 */
export default class World extends Emitter {
  constructor({
    game = null
  } = {}){
    super();
    this.game = game;
    this.entities = new Map();
    this.grid = new Grid();
    this.simulateMatch();
  }

  /**
   * Add an entity
   * @param {String} model
   * @param {{x: Number, y: Number}} position
   * @returns {Entity}
   */
  addEntity({
    model = null,
    position = null
  } = {}){
    var entityModel = this.game.entityModels.get(model);
    if (!entityModel) {
      console.error(`World: Cannot add entity with model "${model}"`); return;
    }

    if (!this.grid.checkSpace(position, entityModel)){
      console.error(`World: Cannot add entity at this place`); return;
    }

    var newEntity = new Entity({
      position,
      model: entityModel
    });

    this.entities.set(newEntity.uuid, newEntity);
    this.emit('entity:add', newEntity.infos);
    newEntity.on('update', (infos) => {
      this.emit('entity:update', infos);
    })

    return newEntity;
  }

  get entitiesList(){
    return Array.from(this.entities.values());
  }

  /**
   * Remove an entity
   * @param {Entity} entity
   * @returns {void}
   */
  removeEntity(entity) {
    entity.destruct();
    this.entities.delete(entity.uuid);
    this.emit('entity:remove', entity.infos);
  }


  simulateMatch(){
    setInterval(()=>{
      this.addEntity({
        model: Math.random() > 0.5 ? 'tree' : 'house',
        position: [
          Math.floor(Math.random()*this.grid.size[0]),
          Math.floor(Math.random()*this.grid.size[1])
        ]
      })
    }, 1000)
  }
}

