<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>

<script>


export default {
  name: 'RoomJoin',
  sockets: {
    'room:connect': function ({ playerId, verifiedRoomId }) {
      this.$store.commit('debug/log', { content: 'room:connect (receive)', label: 'socket' });
      this.$store.commit('setPlayer', playerId);
      this.$store.commit('setRoom', verifiedRoomId);
    },
    'game:create': function () {
      this.$store.commit('debug/log', { content: 'game:create (receive)', label: 'socket' });
      const roomId = this.$router.history.current.params.id;
      this.$router.push({
        name: 'game',
        params: {
          id: roomId,
        },
      });
    },
  },
  data() {
    return {
      msg: '',
    };
  },
  mounted() {
    const roomId = this.$router.history.current.params.id;
    this.$socket.emit('room:join', roomId);
    this.$store.commit('debug/log', { content: 'room:join (emit)', label: 'socket' });
    this.msg = `Joined ${roomId}`;
  },
};
</script>

<style scoped lang="scss">
</style>
