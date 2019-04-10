import Vue from 'vue';
import Vuex from 'vuex';
import adminStore from './admin/store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playerId: null,
    game: null,
  },
  mutations: {
    gameStart(state, game) {
      state.game = game;
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
