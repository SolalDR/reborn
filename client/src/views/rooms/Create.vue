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
import io from 'socket.io-client'

export default {
  name: 'RoomCreate',
  data () {
    return {
      errorMsg: '',
      inviteLink: '',
      socket: io('localhost:3001')
    };
  },
  methods: {
    createRoom() {
      const roomId = this.$refs.roomIdInput.value;

      if (roomId) {
        this.socket.emit('joinRoom', roomId);

        this.inviteLink = `${window.location.origin}#/rooms/${roomId}/join`;
      } else {
        this.errorMsg = 'Empty room - Please enter valid ID';
      }
    },
    copyToClipboard(e) {
      const tmpInput = document.createElement('input');

      document.body.appendChild(tmpInput);
      tmpInput.setAttribute('value', this.inviteLink);
      tmpInput.select();
      document.execCommand('copy');
      document.body.removeChild(tmpInput);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
