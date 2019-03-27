import * as Reborn from "./index";
import Emitter from "./utils/Emitter";
import entityModels from "./entity/models";
import metrics from "./metric"
import World from "./World";


/**
 * @param {[Player]} player
 * @param {Number} interval
 */
export default class Game extends Emitter {
  constructor({
    players = [],
    interval = 250
  }){
    super();
    this.players = players;

    // EntityModel
    this.entityModels = new Map();
    entityModels.forEach(model => {
      this.entityModels.set(model.slug, new Reborn.EntityModel({
        ...model,
        game: this
      }));
    });

    // Metrics
    this.metrics = new Map();
    metrics.forEach(metricConstructor => {
      var metric = new metricConstructor();
      this.metrics.set(metric.slug, metric);
    });

    // Timeline
    this.timeline = new Reborn.Timeline({
      interval,
    });

    // World
    this.world = new World({
      game: this
    });

    this.timeline.on('tick', ()=>{
      this.metrics.forEach(metric => {
        metric.value += metric.recurentOperation;
      })
    })
  }

  /**
   * Start the game
   */
  start() {
    this.emit('start', this.infos);
  }

  /**
   * Returns the player as an array
   */
  get playersList(){
    return Array.from(this.players.values());
  }

  /**
   * Returns the game infos
   */
  get infos(){
    return {
      players: this.playersList.map(player => player.infos)
    }
  }
}