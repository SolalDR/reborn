<template>
  <main class="game">
    <scene/>
  </main>
</template>

<script>
import Scene from '../components/Scene.vue';

export default {
  components: {
    Scene,
  },

  sockets: {
    'entity:add': function () {
      console.log('Add entity');
    },

    'entity:remove': function () {
      console.log('Remove entity');
    },

    'entity:update': function () {
      console.log('Update entity');
    },

    'room:retrieve': function (results) {
      this.$store.commit('gameStart', results);
      this.$router.push({
        name: 'game',
        params: {
          id: results.roomId,
        },
      });
    },
  },

  created() {
    console.log(this.$store.state.playerId, window.localStorage.playerId);

    if (
      !this.$store.state.playerId && window.localStorage.playerId
      && !this.$store.state.roomId && window.localStorage.roomId
    ) {
      console.log('Need to retrieve room');
      this.$socket.emit('room:retrieve', this.$store.state.roomId);
    }
  },
};
</script>

<style lang="scss">
.game {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
