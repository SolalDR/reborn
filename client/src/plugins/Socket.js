import VueSocketIO from 'vue-socket.io';
import store from '../services/store';

export default new VueSocketIO({
  debug: false,
  connection: process.env.VUE_APP_SERVER_URL,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
});
