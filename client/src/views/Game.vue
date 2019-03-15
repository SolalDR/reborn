<template>
  <p>
    {{ $store.state.playerId }}
  </p>
</template>

<script>
export default {
  created(){
    console.log(this.$store.state.playerId, window.localStorage.playerId);
    if (
      !this.$store.state.playerId && window.localStorage.playerId
      && !this.$store.state.roomId && window.localStorage.roomId
    ){
      console.log('Need to retrieve room')
      this.$socket.emit('room:retrieve', this.$store.state.roomId);
      this.$socket.on('room:retrieve', (results) => {
        this.$store.commit('gameStart', result);
        this.$router.push({name: 'game', params: {
          id: roomId
        }});
      });
    }
  }
}
</script>
