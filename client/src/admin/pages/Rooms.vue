<template>
  <div>
    <span class="md-title">Rooms</span>
    <div>
      <md-table>
        <md-table-row>
          <md-table-head>Name</md-table-head>
          <md-table-head>Nombre de joueur</md-table-head>
          <md-table-head>Date de création</md-table-head>
          <md-table-head>Date de début</md-table-head>
          <md-table-head>Statut</md-table-head>
        </md-table-row>

        <md-table-row
          @click="onClickRoom(room.name)"
          v-for="room in rooms"
          v-bind:key="room.createdAt">
          <md-table-cell>{{ room.name }}</md-table-cell>
          <md-table-cell>{{ room.players.filter(p => p.status === 1).length }}</md-table-cell>
          <md-table-cell>{{ formatDate(new Date(room.createdAt)) }}</md-table-cell>
          <md-table-cell>
            {{
            room.game && room.game.startedAt
              ? formatDate(new Date(room.game.startedAt))
              : null
            }}
          </md-table-cell>
          <md-table-cell>{{ room.game ? room.game.status : null }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Room',
  data() {
    return {
      rooms: [],
    };
  },
  created() {
    this.$socket.on('room:list', (rooms) => {
      this.rooms = rooms;
      this.rooms.forEach((room) => {
        if (room.game) {
          console.log(room.game.startedAt);
        }
      });
    });

    this.$socket.on('room:add', () => {
      this.$socket.emit('room:list', { token: this.$store.state.admin.token });
    });

    this.$socket.emit('room:list', { token: this.$store.state.admin.token });
  },
  methods: {
    formatDate(date) {
      if (!date) {
        return '';
      }
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
    onClickRoom(roomName) {
      console.log(`/admin/rooms/${roomName}`);
      this.$router.push({ path: `/admin/rooms/${roomName}` });
    },
  },
};
</script>
