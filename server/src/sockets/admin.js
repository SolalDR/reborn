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

      var entityAddCallback = (entity) => {
        this.emit('entity:add', entity);
      }

      var entityRemoveCallback = (entity) => {
        this.emit('entity:remove', entity);
      }

      var entitiesListCallback = () => {
        var entities = room.game.world.entitiesList.map(e => e.infos);
        this.emit('room:entities', entities);
      }


      function gameListener() {
        var entities = room.game.world
        room.on('tick', tickCallback);

        // entity
        entitiesListCallback();
        room.game.world.on('entity:add', entityAddCallback);
        room.game.world.on('entity:remove', entityRemoveCallback);
      }

      // If game is not defined wait to launch events
      if(!room.game) {
        room.on('update', () => {
          if(room.game) gameListener()
        })
      } else {
        gameListener();
      }

      this.on('disconnect', () => {
        room.off('tick', tickCallback);
        room.game.off('entity:add', entityAddCallback);
        room.game.off('entity:remove', entityRemoveCallback);
      })
    }
  },
}
