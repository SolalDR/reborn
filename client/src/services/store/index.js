import Vue from 'vue';
import Vuex from 'vuex';
import adminStore from '../../admin/store';
import Reborn from '../../game';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playerId: null,
    game: null,
  },
  mutations: {
    'SOCKET_game:start': function (state, game) {
      state.game = new Reborn.Game({
        players: game.players.map(p => new Reborn.Player(p)),
      });
    },

    'SOCKET_timeline:tick': function (state, { metrics }) {
      metrics.forEach((metric) => {
        state.game.metrics.get(metric.slug).update(metric);
      });
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
