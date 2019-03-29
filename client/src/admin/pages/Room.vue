<template>
  <div class="admin-room">
    <span class="admin-room__title md-display-1">Room: {{ room.name }}</span>
    <div class="header">
      <md-tabs md-sync-route>
        <md-tab id="tab-home" md-label="Overview" @click="component = 'overview'">
          <div v-for="(metric, i) in metrics" :key="i">
            <p>{{ metric.name }}</p>
            <md-progress-bar md-mode="buffer" :md-buffer="100" :md-value="metric.value"></md-progress-bar>
          </div>
        </md-tab>

        <md-tab id="tab-pages" md-label="History" @click="component = 'history'">
          History
        </md-tab>

        <md-tab id="tab-posts" md-label="Map" @click="component = 'map'">
          Map
        </md-tab>
      </md-tabs>
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
    margin-bottom: 32px;
  }
  .md-tabs-navigation {
    margin-bottom: 32px;
  }
}
</style>
