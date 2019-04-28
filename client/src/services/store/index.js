import Vue from 'vue';
import Vuex from 'vuex';
import adminStore from '../../admin/store';
import Reborn from '../../game';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playerId: null,
    roomId: null,
    game: null,
    clusters: null,
  },
  mutations: {
    'SOCKET_game:start': function (state, game) {
      state.game = new Reborn.Game({
        players: game.players.map(p => new Reborn.Player(p)),
        seed: game.seed,
      });
    },

    'SOCKET_entity:add': function (state, item) {
      const cluster = state.game.clusters[item.model];
      if (cluster) {
        cluster.addItem({
          position: new THREE.Vector3(item.position.x, item.position.y, item.position.z),
          rotation: new THREE.Euler(item.rotation._x, item.rotation._y, item.rotation._z),
        });
      }
    },

    'SOCKET_timeline:tick': function (state, { metrics }) {
      metrics.forEach((metric) => {
        state.game.metrics.get(metric.slug).update(metric);
      });
    },

    setClusters(state, clusters) {
      state.game.clusters = clusters;
    },

    setPlayer(state, playerId) {
      state.playerId = playerId;
      window.localStorage.playerId = playerId;
    },

    setRoom(state, roomId) {
      state.roomId = roomId;
      window.localStorage.roomId = roomId;
    },
  },
  modules: {
    admin: adminStore,
  },
});
