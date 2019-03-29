<template>
  <div class="admin-room">
    <h1 class="admin-room__title md-display-1">Room: {{ room.name }}</h1>
    <div class="header">
      <md-tabs md-sync-route>
        <md-tab id="tab-home" md-label="Overview" @click="component = 'overview'">
        </md-tab>
        <md-tab id="tab-pages" md-label="History" @click="component = 'history'">
        </md-tab>
        <md-tab id="tab-posts" md-label="Map" @click="component = 'map'">
        </md-tab>
      </md-tabs>
    </div>
    <div>

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
            Temps écoulé : {{  Math.floor((Date.now() - room.game.startedAt)*0.001) + 's' }}
          </p>
        </md-card-content>
      </md-card>

      <md-card>
        <md-card-header>
          <div class="md-title">Metrics</div>
        </md-card-header>

        <md-card-content>
          <div v-for="(metric, i) in metrics" :key="i">
            <p>{{ metric.name }}</p>
            <md-progress-bar md-mode="buffer" :md-buffer="100" :md-value="metric.value"></md-progress-bar>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>

import Overview from './rooms/Overview.vue';
import Map from './rooms/Map.vue';
import History from './rooms/History.vue';

export default {
  name: 'Room',

  component: {
    Overview,
    Map,
    History,
  },

  data() {
    return {
      room: null,
      metrics: [],
      entities: [],
      component: 'overview',
    };
  },
  created() {
    this.$socket.emit('admin:listen', {
      token: this.$store.state.admin.token,
      name: this.$route.params.name,
    });

    this.$socket.on('admin:listen', (room) => {
      this.room = room;
      console.log(JSON.parse(JSON.stringify(room)));
    });

    this.$socket.on('admin:tick', ({ metrics, entities }) => {
      this.metrics = metrics;
      this.entities = entities;
    });
  },
};
</script>

<style lang="scss" >
.admin-room {
  &__title {
    margin-bottom: 16px;
    margin-top: 0;
  }
  .md-tabs-navigation {
    margin-bottom: 32px;
  }

  .header {
    display: none;
  }
}
</style>
