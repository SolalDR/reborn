import Room from '../Room';
import Player from '../Player';
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

    if (!socketRooms[roomId]) {
      const client = this.join(roomId);
      const room = new Room(roomId, this);
      process.rooms.set(roomId, room);
      Bus.emit('room:add', roomId);
      room.addPlayer(new Player(client));

      this.emit('room:connect', {
        playerId: client.id,
        roomId: room.id
      });

      console.log('Player with id ' + client.id + ' connected');
    } else {
      const room = process.rooms.get(roomId);
      const player = room.players.size < 2 ? new Player(this.join(roomId)) : null;
      if (player) {
        room.addPlayer(player);
        this.emit('room:connect', {
          playerId: player.id,
          roomId: room.id
        });
        if( room.players.size === 2 ){
          room.launchGame();
        }

        console.log('Player with id ' + player.id + ' connected');
      } else {
        // TODO: Manage error room is full
        console.log('Room is full');
      }
    }
  }
}
