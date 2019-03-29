import Bus from "./../Bus";
import roomSocket from "./room";
process.token = '1234';

export default {
  authenticate(mdp){
    if( mdp === process.env.MDP ){
      this.emit('admin:authenticate', {
        valid: true,
        token: process.token
      })

      var onRoomListChange = () => {
        roomSocket.list.call(this, {
          token: process.token
        });
      }

      Bus.on('room:add', onRoomListChange);
      Bus.on('room:remove', onRoomListChange);
      Bus.on('room:update', onRoomListChange);
      this.on('disconnect', () => {
        Bus.off('room:add', onRoomListChange);
        Bus.off('room:remove', onRoomListChange);
        Bus.off('room:update', onRoomListChange);
      })
      return;
    }
    this.emit('admin:authenticate', {
      valid: false,
      token: null
    });
  },

  startListen({ token, name }) {
    if (token === process.token) {
      var room = process.rooms.get(name);
      this.emit('admin:listen', room.infos);
      var tickCallback = (args) => {
        this.emit('admin:tick', args);
      };


      room.on('tick', tickCallback);
      this.on('disconnect', () => {
        room.off('tick', tickCallback);
      })
    }
  },
}
