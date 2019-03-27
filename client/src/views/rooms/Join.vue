<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>

<script>


export default {
  name: 'RoomJoin',
  data() {
    return {
      msg: '',
    };
  },
  mounted() {
    const roomId = this.$router.history.current.params.id;

    this.$socket.emit('room:join', roomId);
    this.$socket.on('game:start', (result) => {
      this.$store.commit('gameStart', result);
      this.$router.push({
        name: 'game',
        params: {
          id: roomId,
        },
      });
    });

    this.$socket.on('room:connect', ({ playerId, verifiedRoomId }) => {
      this.$store.commit('setPlayer', playerId);
      this.$store.commit('setRoom', verifiedRoomId);
    });

    this.msg = `Joined ${roomId}`;
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
</style>
