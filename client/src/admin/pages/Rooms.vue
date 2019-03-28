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

        <md-table-row v-for="room in rooms" v-bind:key="room">
          <md-table-cell>{{ room.name }}</md-table-cell>
          <md-table-cell>{{ room.players.length }}</md-table-cell>
          <md-table-cell>{{ formatDate(new Date(room.createdAt)) }}</md-table-cell>
          <md-table-cell>{{ formatDate(new Date(room.game.startedAt)) }}</md-table-cell>
          <md-table-cell>{{ room.game.status }}</md-table-cell>
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
      console.log(rooms);
      this.rooms = rooms;
    });
    this.$socket.on('room:add', (room) => {
      console.log(room);
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
  },
};
</script>
