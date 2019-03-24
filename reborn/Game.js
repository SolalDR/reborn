import * as Reborn from "./index";
import Emitter from "./utils/Emitter";
import entityModels from "./entity/models";
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
    this.entityModels = new Map();
    entityModels.forEach(model => {
      this.entityModels.set(model.slug, new Reborn.EntityModel(model));
    });

    this.timeline = new Reborn.Timeline({
      interval,
    });

    this.world = new World();
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