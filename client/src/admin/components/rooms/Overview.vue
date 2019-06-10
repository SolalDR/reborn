<template>
  <md-card class="md-size-50">
    <md-card-header>
      <div class="md-title">Overview</div>
    </md-card-header>

    <md-card-content>
      <p>Créer à : {{ new Date(room.createdAt).toLocaleString() }}</p>
      <p v-if="room.game">
        Début du jeu : {{ new Date(room.game.startedAt).toLocaleString() }}
      </p>
      <p v-if="room.game && room.game.endedAt">
        Terminé à : {{ new Date(room.game.endedAt).toLocaleString() }}
      </p>
      <p v-if="room.game && !room.game.endedAt">
        Temps écoulé : {{ `${currentTime}s` }}
      </p>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: 'OverviewComponent',

  props: {
    room: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      currentTime: this.room.game ? Math.floor((Date.now() - this.room.game.startedAt) * 0.001) : 0,
    };
  },

  mounted() {
    setInterval(() => { this.currentTime++; }, 1000);
  },
};
</script>
