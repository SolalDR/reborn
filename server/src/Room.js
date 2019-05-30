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
    this.historic = new Historic();
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

  createGame(){
    this.game = new Game({
      players: this.players,
      socket: this.socket,
      room: this
    });
    this.initSocketListeners();

    this.game.on('start', (infos)=>{
      this.emit('update', this.infos);
      this.emit('start', this.infos);
    })

    this.emit('update', this.infos);
    this.emit('create', this.game.infos);
  }

  checkPlayersReady() {
    let ready = true;
    this.players.forEach((player) => {
      if(!player.ready) ready = false;
    })

    return ready;
  }

  /**
   * Register all the events in the game which will be dispatched to players
   */
  initSocketListeners() {

    // EMITTING
    this.on('create', (args) => this.dispatchToPlayers('game:create', args));
    this.game.on('start', (args) => this.dispatchToPlayers('game:start', args));
    this.game.on('tick', (args) => this.dispatchToPlayers('timeline:tick', args));
    this.game.on('end', (args) => this.dispatchToPlayers('game:end', args));
    this.game.world.on('entity:add', (args) => this.dispatchToPlayers('entity:add', args));
    this.game.world.on('entity:remove', (args) => this.dispatchToPlayers('entity:remove', args));
    this.game.world.on('entity:update', (args) => this.dispatchToPlayers('entity:update', args));
    this.game.notificationManager.on('notification:send', (args) => this.dispatchToPlayers('notification:send', args));

    this.game.skillsManager.on('skill:available', (args) => {
      console.log('skill:available', args);
      this.dispatchToPlayers('skill:available', args)
    });
    this.game.skillsManager.on('skill:unavailable', (args) => {
      console.log('skill:unavailable', args);
      this.dispatchToPlayers('skill:unavailable', args)
    });
    this.game.skillsManager.on('skill:start', (args) => {
      console.log('skill:start', args);
      this.dispatchToPlayers('skill:start', args)
    });

    // RECEIVE
    this.players.forEach(player => {
      player.socket.on('player:ready',  () => {
        player.ready = true;
        if(this.checkPlayersReady()) this.game.start();
      })

      player.socket.on('skill:start', ({ slug }) => {
        const skill = this.game.skillsManager.skills.get(slug);
        console.log('receive skill start');
        if (skill && player.role.name === skill.role) skill.start();
      });

      player.socket.on('grid:ready',    (grid) => this.game.world.updateGrid(grid));
      player.socket.on('entity:add',    (entity) => this.game.world.addEntity(entity));
      player.socket.on('entity:remove', (entity) => {
        const entityModel = this.game.entityModels.get(entity.model);
        if (entityModel && (
          entityModel.role === null && player.role.name === 'nature' ||
          player.role.name === 'city'
        )) {
          this.game.world.removeEntity(this.game.world.entities.get(entity.uuid));
        }
      });
    });
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
      game: this.game ? this.game.infos : null,
    }
  }
}
