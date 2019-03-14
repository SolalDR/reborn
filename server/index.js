const express = require('express');
const app = express();
const server = app.listen(3001, function() {
  console.log('server running on port 3001');
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('joinRoom', function(roomId) {
    socket.join(roomId)
    console.log(`joined ${roomId}`, socket.rooms);
  });
});
