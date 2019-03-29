import Game from "./Game";
import Emitter from "./../../reborn/utils/Emitter";
import Bus from "./Bus";
import Player from "./Player";

export default class Room extends Emitter {
  constructor(id, socket){
    super();
    this.id = id;
    this.socket = socket;
    this.createdAt = Date.now();
    this._room = socket.adapter.rooms[this.id];
    this.length = 0;
    this.game = null;
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
      Bus.emit('room:update');
    })

    this.length++;
    Bus.emit('room:udpate', this);
  }


  launchGame(){
    this.game = new Game({
      players: this.players, 
      socket: this.socket
    });

    this.game.on('start', (infos)=>{
      this.socket.emit('game:start', infos);
      this.socket.broadcast.to(this.id).emit('game:start', infos);
      Bus.emit('room:update', this);
      this.emit('update');
    })

    this.game.on('tick', (args) => this.emit('tick', args))

    this.game.start();
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