import socketAdmin from "./src/sockets/admin";
import socketRoom from "./src/sockets/room";

const express = require('express');
const app = express();
process.server = app.listen(3001, function() {
  console.log('server running on port 3001');
});
process.io = require('socket.io')(process.server);
process.rooms = new Map();

process.io.on('connection', function(socket) {
  socket.on('admin:authenticate', socketAdmin.authenticate);
  socket.on('room:join', socketRoom.join.bind(socket));
});