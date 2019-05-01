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
    'SOCKET_game:create': function (state, game) {
      state.game = game;
    },

    'SOCKET_timeline:tick': function (state, { metrics }) {
      state.game.metrics = metrics;
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
