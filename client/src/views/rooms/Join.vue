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
      console.log('-- ROOM JOINED');
      this.$store.commit('setPlayer', playerId);
      this.$store.commit('setRoom', verifiedRoomId);
    },
    'game:start': function () {
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
    this.msg = `Joined ${roomId}`;
  },
};
</script>

<style scoped lang="scss">
</style>
