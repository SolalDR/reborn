<template>
  <p>
    {{ $store.state.playerId }}
  </p>
</template>

<script>
export default {
  created() {
    this.$socket.on('entity:add', () => {
      console.log('Add entity');
    });

    this.$socket.on('entity:remove', () => {
      console.log('Remove entity');
    });

    this.$socket.on('entity:update', () => {
      console.log('Update entity');
    });

    this.$bus.$on('viewport:resize', ({ width, height }) => {
      console.log(width, height);
    });

    this.$bus.$on('mouse:move', (event) => {
      console.log(event);
    });

    console.log(this.$store.state.playerId, window.localStorage.playerId);
    if (
      !this.$store.state.playerId && window.localStorage.playerId
      && !this.$store.state.roomId && window.localStorage.roomId
    ) {
      console.log('Need to retrieve room');
      this.$socket.emit('room:retrieve', this.$store.state.roomId);
      this.$socket.on('room:retrieve', (results) => {
        this.$store.commit('gameStart', results);
        this.$router.push({
          name: 'game',
          params: {
            id: results.roomId,
          },
        });
      });
    }
  },
};
</script>
