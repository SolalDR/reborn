import Game from "./game/Game";
import Player from "./game/Player";

import Emitter from "@solaldr/emitter";
import Historic from "./Historic"

export default class Room extends Emitter {
  constructor(id, socket){
    super();
    this.id = id;
    this.socket = socket;
    this.createdAt = Date.now();
    this._room = socket.adapter.rooms[this.id];
    this.length = 0;
    this.game = null;
    this.historic = new Historic()
    this.players = new Map();
    if( !this._room ){
      return null;
    }
  }

  addPlayer(player){
    this.players.set(player.id, player);
    player.socket.on('disconnect', () => {
      player.status = Player.ABSENT;
      if(!this.roomActive) {
        process.rooms.delete(this.id);
      }
      this.emit('update', this.infos);
    })

    this.length++;
    this.emit('update', this.infos);
  }

  launchGame(){
    this.game = new Game({
      players: this.players,
      socket: this.socket,
      room: this
    });
    this.initSocketListeners();

    this.game.on('start', (infos)=>{
      this.emit('update', this.infos);
      this.emit('start', infos);
    })

    this.game.start();
  }

  /**
   * Register all the events in the game which will be dispatched to players
   */
  initSocketListeners() {
    this.on('start', (args) => this.dispatchToPlayers('game:create', args));

    this.game.on('tick', (args) => this.dispatchToPlayers('timeline:tick', args));
    this.game.world.on('entity:add', (args) => this.dispatchToPlayers('entity:add', args));
    this.game.world.on('entity:remove', (args) => this.dispatchToPlayers('entity:add', args));
    this.game.world.on('entity:update', (args) => this.dispatchToPlayers('entity:update', args));

    this.players.forEach(player => {
      player.socket.on('entity:add',    (entity) => this.game.world.addEntity(entity));
      player.socket.on('entity:remove', (entity) => this.game.world.removeEntity(entity));
    })
  }

  /**
   * Dispatch a socket event to all the players connected
   * @param {string} eventName Ex: room:update, entity:add
   * @param {*} datas An object of datas passed to all the listeners
   */
  dispatchToPlayers(eventName, datas) {
    this.players.forEach(player => {
      player.socket.emit(eventName, datas);
    })

    this.historic.addEntry('log', eventName, datas);
  }

  get roomActive() {
    var active = false;
    Array.from(this.players.values()).forEach(player => {
      if (player.status === Player.ACTIVE) {
        active = true;
      }
    })
    return active;
  }

  get infos() {
    return {
      name: this.id,
      createdAt: this.createdAt,
      players: Array.from(this.players.values()).map(p => p.infos),
      game: this.game ? {
        status: this.game.status,
        startedAt: this.game.startedAt
      } : null
    }
  }
}
