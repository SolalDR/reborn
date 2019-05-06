import Room from '../Room';
import Player from '../game/Player';
import Bus from "./../Bus";

/**
 * @this Socket
 */
export default {
  list(params){
    if(process.token === params.token) {
      var rooms = [];
      process.rooms.forEach(room => rooms.push(room.infos));
      this.emit('room:list', rooms);
    }
  },

  join(roomId){
    const socketRooms = process.io.sockets.adapter.rooms

    // If creating the room
    if (!socketRooms[roomId]) {
      const client = this.join(roomId);
      const room = new Room(roomId, this);
      room.on('update', () => Bus.emit('rooms:update'));

      process.rooms.set(roomId, room);
      room.addPlayer(new Player(client, this));
      this.emit('room:connect', {
        playerId: client.id,
        roomId: room.id
      });
      Bus.emit('room:add', this);

    // If joining the room
    } else {
      const room = process.rooms.get(roomId);
      const player = room.players.size < 2 ? new Player(this.join(roomId), this) : null;

      if(!player) return;

      room.addPlayer(player);
      this.emit('room:connect', {
        playerId: player.id,
        roomId: room.id
      });
      Bus.emit('rooms:update');
      if( room.players.size === 2 ){
        room.launchGame();
      }
    }
  }
}
