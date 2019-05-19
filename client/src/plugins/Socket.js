import VueSocketIO from 'vue-socket.io';
import store from '../services/store';

export default new VueSocketIO({
  debug: false,
  connection: 'localhost:3001',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
});
