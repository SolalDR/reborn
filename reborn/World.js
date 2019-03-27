import Emitter from "./utils/Emitter";
import Grid from "./Grid";
import Entity from "./entity";

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
   * @param {Player} player
   * @param {String} model
   * @param {x: Number, y: Number} position
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
    return newEntity;
  }

  removeEntity(entity) {
    entity.destruct();
    this.entities.delete(entity.uuid);
  }

  // simulateMatch(){
  //   var models = Array.from(this.game.entityModels.keys());
  //   for (var i=0; i<30; i++) {
  //     var entity = this.addEntity({
  //       model: models[Math.floor(models.length*Math.random())],
  //       position: [
  //         Math.ceil(Math.random()*this.grid.size[0]),
  //         Math.ceil(Math.random()*this.grid.size[1])
  //       ]
  //     });

  //     if (entity) {
  //       // console.log(entity.log());
  //     }
  //   }
  //   this.game.timeline.on('tick', ()=>{
  //     console.log(this.game.metrics.get('pollution').value);
  //   })
  // }

  simulateMatch(){
    var entity = this.addEntity({
      model: 'tree',
      position: [0, 0]
    });

    console.log(this.entities.size);
    setTimeout(()=>{
      this.removeEntity(entity)
      console.log(this.entities.size);
    }, 10000)

    this.game.timeline.on('tick', ()=>{
      console.log(this.game.metrics.get('pollution').value);
    })
  }
}

