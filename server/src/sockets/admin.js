import Bus from "./../Bus";
import roomSocket from "./room";
process.token = '1234';

/**
 * Define the sockets endpoints namespaced with admin
 * @this Socket
 */
export default {

  /**
   * Authentification via admin:authenticate endpoint
   * @param {string} mdp
   */
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

  /**
   * Start listening to a room with admin:listen endpoint
   * @param {string} token The token to anthenticate
   * @param {string} name The name of the room you want to listen
   */
  startListen({ token, name }) {
    const room = process.rooms.get(name);
    if (token === process.token && room) {
      const tickCallback = (args) => {
        this.emit('admin:tick', args);
      };

      const entityAddCallback = (entity) => {
        this.emit('entity:add', entity);
      }

      const entityRemoveCallback = (entity) => {
        this.emit('entity:remove', entity);
      }

      const entityUpdateCallback = (entity) => {
        this.emit('entity:update', entity);
      }

      const entitiesListCallback = () => {
        const entities = room.game.world.entitiesList.map(e => e.infos);
        this.emit('room:entities', entities);
      }

      var isListeningGame = false;

      // A listner
      function gameListener() {
        if(!room.game) return;
        isListeningGame = true;
        entitiesListCallback();

        // entity
        room.game.on('tick', tickCallback);
        room.game.world.on('entity:add', entityAddCallback);
        room.game.world.on('entity:remove', entityRemoveCallback);
        room.game.world.on('entity:update', entityUpdateCallback);
      }

      this.emit('admin:listen', room.infos);

      // If game is not defined wait to launch events
      gameListener();
      room.on('start', gameListener());

      // Remove events when admin disconnects
      this.on('disconnect', () => {
        room.game.off('tick', tickCallback);
        room.game.world.off('entity:add', entityAddCallback);
        room.game.world.off('entity:remove', entityRemoveCallback);
        room.game.world.off('entity:update', entityUpdateCallback);
      })
    }
  },
}
