import Room from './src/Room';
import Player from './src/Player';
import socketAdmin from "./src/sockets/admin";


const express = require('express');
const app = express();
const server = app.listen(3001, function() {
  console.log('server running on port 3001');
});
const io = require('socket.io')(server);

process.rooms = new Map();

io.on('connection', function(socket) {

  socket.on('admin:authenticate', socketAdmin.authenticate);
  socket.on('room:join', function(roomId) {
    const socketRooms = io.sockets.adapter.rooms

    if (!socketRooms[roomId]) {
      const client = socket.join(roomId);
      const room = new Room(roomId, socket);
      process.rooms.set(roomId, room);
      room.addPlayer(new Player(client));

      socket.emit('room:connect', {
        playerId: client.id,
        roomId: room.id
      });

      console.log('Player with id ' + client.id + ' connected');
    } else {
      const room = process.rooms.get(roomId);
      const player = room.players.size < 2 ? new Player(socket.join(roomId)) : null;
      if (player) {
        room.addPlayer(player);
        socket.emit('room:connect', {
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


  });
});
