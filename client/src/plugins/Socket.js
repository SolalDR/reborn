import Vue from 'vue';
import io from 'socket.io-client';

export default {
  install() {
    Vue.prototype.$socket = io('localhost:3001');
  },
};
