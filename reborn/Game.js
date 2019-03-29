import * as Reborn from "./index";
import Emitter from "./utils/Emitter";
import entityModels from "./entity/models";
import metrics from "./metric"
import World from "./World";


/**
 * @param {[Player]} player
 * @param {Number} interval
 */
class Game extends Emitter {
  constructor({
    players = [],
    interval = 250
  }){
    super();
    this.players = players;
    this.status = Game.PENDING;

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

    var metricsMap = Array.from(this.metrics.values());
    this.timeline.on('tick', ()=>{
      this.metrics.forEach(metric => {
        metric.value += metric.recurentOperation;
      })
      this.emit('tick', {
        metrics: metricsMap.map(m => m.infos)
      })
    })
  }

  /**
   * Start the game
   */
  start() {
    this.startedAt = Date.now();
    this.status = Game.PLAYING;
    this.emit('start', this.infos);
  }

  /**
   * Finish the game
   */
  finish(){
    this.finishedAt = Date.now();
    this.status = Game.FINISHED;
    this.emit('finish', this.infos);
  }

  get timePlay() {
    return this.status === Game.FINISHED ? this.finishedAt - this.startedAt : Date.now() - this.startedAt;
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

Game.PENDING = 1;
Game.PLAYING = 2;
Game.FINISHED = 3;
export default Game;