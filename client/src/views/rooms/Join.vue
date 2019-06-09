<template>
  <div class="join"></div>
</template>

<script>
export default {
  name: 'RoomJoin',

  sockets: {
    'room:connect': function (args) {
      this.onRoomConnect(args);
    },
    'game:create': function (args) {
      this.onGameCreate(args);
    },
  },

  data() {
    return {
      msg: '',
    };
  },
  mounted() {
    const roomId = this.$router.history.current.params.id;
    if (navigator.userAgent.match(/^FacebookExternalHit\/.*?|Facebot/i)) return;
    this.$socket.emit('room:join', roomId);
    this.$store.commit('debug/log', { content: 'room:join (emit)', label: 'socket' });
    this.msg = `Joined ${roomId}`;
  },

  methods: {
    /**
     * socket
     */
    onRoomConnect({ playerId, verifiedRoomId }) {
      this.$store.commit('debug/log', { content: 'room:connect (receive)', label: 'socket' });
      this.$store.commit('setPlayer', playerId);
      this.$store.commit('setRoom', verifiedRoomId);
    },

    onGameCreate(game) {
      this.$store.commit('debug/log', { content: 'game:create (receive)', label: 'socket' });
      this.$store.commit('setGame', game);
      const roomId = this.$router.history.current.params.id;
      this.$router.push({
        name: 'game',
        params: {
          id: roomId,
        },
      });
    },
  },
};
</script>

<style lang="scss">
  .join {
    width: 100vw;
    height: 100vh;
    background-color: getColor(mains, primary);
  }
</style>
