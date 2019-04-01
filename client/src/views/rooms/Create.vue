<template>
  <div>
    <p>Let's start a new game!</p>

    <div>
      <input ref="roomIdInput" type="text">
      <button type="button" @click="createRoom">Create room</button>
    </div>

    <div v-if="errorMsg && !inviteLink">
      <p>{{ errorMsg }}</p>
    </div>

    <div v-if="inviteLink">
      <p>Invite a friend to collaborate with you!</p>
      <p>{{inviteLink}}</p>
      <button type="button" @click="copyToClipboard">Copy invite link</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomCreate',
  data() {
    return {
      errorMsg: '',
      inviteLink: '',
    };
  },
  methods: {
    createRoom() {
      const roomId = this.$refs.roomIdInput.value;

      if (roomId) {
        this.$socket.emit('room:join', roomId);
        this.$socket.on('room:connect', ({ playerId, verifiedRoomId }) => {
          this.$store.commit('setPlayer', playerId);
          this.$store.commit('setRoom', verifiedRoomId);
        });

        this.$socket.on('game:start', (result) => {
          this.$store.commit('gameStart', result);
          this.$router.push({
            name: 'game',
            params: {
              id: roomId,
            },
          });
        });

        this.inviteLink = `${window.location.origin}#/rooms/${roomId}/join`;
      } else {
        this.errorMsg = 'Empty room - Please enter valid ID';
      }
    },
    copyToClipboard() {
      const tmpInput = document.createElement('input');
      document.body.appendChild(tmpInput);
      tmpInput.setAttribute('value', this.inviteLink);
      tmpInput.select();
      document.execCommand('copy');
      document.body.removeChild(tmpInput);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
