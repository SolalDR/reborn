import Game from "./Game";

export default class Room {
  constructor(id, socket){
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
    this.length++;
  }

  launchGame(){
    this.game = new Game({
      players: this.players, 
      socket: this.socket
    });

    this.game.on('start', (infos)=>{
      this.socket.emit('game:start', infos);
      this.socket.broadcast.to(this.id).emit('game:start', infos);
    })
    
    this.game.start();
  }
}