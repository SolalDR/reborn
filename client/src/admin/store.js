export default {
  namespaced: true,
  state: {
    token: null,
    rooms: [],
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
    },
  },
};
