import socketAdmin from './src/sockets/admin';
import socketRoom from './src/sockets/room';

const express = require('express');

const app = express();
process.server = app.listen(process.env.PORT || 3001, () => {
  console.log('server running on port 3001');
});
process.io = require('socket.io')(process.server);

process.rooms = new Map();

process.io.on('connection', (socket) => {
  socket.on('admin:authenticate', socketAdmin.authenticate.bind(socket));
  socket.on('admin:listen', socketAdmin.startListen.bind(socket));
  socket.on('room:join', socketRoom.join.bind(socket));
  socket.on('room:list', socketRoom.list.bind(socket));
});
