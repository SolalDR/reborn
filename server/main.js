import Room from './src/Room';
import Player from './src/Player';

const express = require('express');
const app = express();
const server = app.listen(3001, function() {
  console.log('server running on port 3001');
});
const io = require('socket.io')(server);

const rooms = new Map();

io.on('connection', function(socket) {
  socket.on('joinRoom', function(roomId) {
    const socketRooms = io.sockets.adapter.rooms

    if (!socketRooms[roomId]) {
      const client = socket.join(roomId);
      const room = new Room(roomId, socket);
      rooms.set(roomId, room);
      room.addPlayer(new Player(client));
    } else {
      const room = rooms.get(roomId);
      const player = room.players.size < 2 ? new Player(socket.join(roomId)) : null;
      if (player) {
        room.addPlayer(player);
        if( room.players.size === 2 ){
          room.launchGame();
        }
      } else {
        // TODO: Manage error room is full
        console.log('Room is full');
      }
    }
  });
});
