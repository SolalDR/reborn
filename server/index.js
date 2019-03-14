const express = require('express');
const app = express();
const server = app.listen(3001, function() {
  console.log('server running on port 3001');
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('joinRoom', function(roomId) {
    const rooms = io.sockets.adapter.rooms

    if (!rooms[roomId]) {
      socket.join(roomId)
    } else {
      const nbOfPlayer = rooms[roomId].length
      nbOfPlayer < 2 ? socket.join(roomId) : console.log('Room is full')
    }

    console.log(`${roomId}`, `| Number of player: ${rooms[roomId].length}`);
  });
});
