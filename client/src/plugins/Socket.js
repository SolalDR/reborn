import VueSocketIO from 'vue-socket.io';

export default new VueSocketIO({
  debug: true,
  connection: 'localhost:3001',
});
