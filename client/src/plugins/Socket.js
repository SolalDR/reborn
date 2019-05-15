import VueSocketIO from 'vue-socket.io';
import store from '../services/store';

export default new VueSocketIO({
  debug: false,
  connection: 'https://reborn-game.herokuapp.com',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
});
