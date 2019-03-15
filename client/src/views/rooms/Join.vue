<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'RoomJoin',
  data () {
    return {
      msg: '',
      socket: io('localhost:3001')
    };
  },
  mounted () {
    const roomId = this.$router.history.current.params.id

    this.socket.emit('joinRoom', roomId);
    this.msg = `Joined ${roomId}`
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
</style>
