<template>
  <div class="join">
    <loader :text="`Joining ${$router.history.current.params.id}...`"/>
  </div>
</template>

<script>
import Loader from '../../components/global/Loader'
import Overlay from "../../components/global/Overlay";

export default {
  name: 'RoomJoin',
  components: {
    Overlay,
    Loader
  },
  sockets: {
    'room:connect': function ({ playerId, verifiedRoomId }) {
      this.$store.commit('setPlayer', playerId);
      this.$store.commit('setRoom', verifiedRoomId);
    },
    'game:create': function (game) {
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
  data() {
    return {
      msg: '',
    };
  },
  mounted() {
    const roomId = this.$router.history.current.params.id;

    this.$socket.emit('room:join', roomId);
    this.msg = `Joining ${roomId}...`;
  },
};
</script>

<style lang="scss">
  .join {
    @include useFlex();
    height: 100vh;
  }
</style>
