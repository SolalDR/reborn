import VueSocketIO from 'vue-socket.io';
import Vue from 'vue';
import store from '../services/store';
import config from '@/config';

const socket = {
  instance: null,
};

if (config.server.enabled) {
  socket.instance = new VueSocketIO({
    debug: false,
    connection: process.env.VUE_APP_SERVER_URL,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  });
} else {
  socket.instance = {
    install() {
      Vue.prototype.$socket = {
        emit(event) {
          console.warn('Socket: (local) Server disable', event);
        },
      };
    },
  };
}

export default socket.instance;
