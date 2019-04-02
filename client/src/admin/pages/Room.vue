<template>
  <div class="admin-room">
    <h1 class="admin-room__title md-display-1" v-if="room">Room: {{ room.name }}</h1>

    <header>
      <md-tabs>
        <template slot="md-tab" slot-scope="{ tab }">
          {{ tab.label }} <i class="badge" v-if="tab.data.badge">{{ tab.data.badge }}</i>
        </template>

        <md-tab id="tab-overview" md-label="Overview">
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
        </md-tab>

        <md-tab id="tab-metrics" md-label="Metrics">
          <md-card>
            <md-card-header>
              <div class="md-title">Metrics</div>
            </md-card-header>

            <md-card-content class="metrics">
              <div v-for="(metric, i) in metrics" :key="i" class="metric">
                <p>{{ metric.name }}</p>
                <md-progress-bar md-mode="buffer" :md-buffer="100" :md-value="metric.value"></md-progress-bar>
              </div>
            </md-card-content>
          </md-card>
        </md-tab>

        <md-tab id="tab-logs" md-label="Logs" :md-template-data="{ badge: unreadedLogs }" @click="unreadedLogs = 0">
          <p>Logs content</p>
        </md-tab>
      </md-tabs>
    </header>

    <md-card>
      <md-card-header>
        <div class="md-title">Grille</div>
      </md-card-header>

      <md-card-content>
        <grid-component
          :size="[32, 32]"
          :cells="entities"
          @clickCell="onClickCell($event)"
          />
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
// TODO: Add templates in components
// import Overview from './rooms/Overview.vue';
// import Map from './rooms/Map.vue';
// import History from './rooms/History.vue';
import GridComponent from './rooms/Grid.vue';

export default {
  name: 'Room',

  components: {
    // Overview,
    // Map,
    // History,
    GridComponent,
  },

  data() {
    return {
      entities: new Array(32 * 32).fill(null),
      logs: ['Log 1', 'Log 2', 'Log 1', 'Log 2', 'Log 1', 'Log 2', 'Log 1', 'Log 2', 'Log 1', 'Log 2', 'Log 1', 'Log 2'],
      unreadedLogs: 0,
      metrics: [],
      room: null,
    };
  },

  created() {
    this.$socket.emit('admin:listen', {
      token: this.$store.state.admin.token,
      name: this.$route.params.name,
    });

    this.$socket.on('admin:listen', (room) => {
      this.room = room;
      this.onConnectRoom();
    });

    this.entities[42] = {
      model: 'tree',
      color: '#CCC',
    };

    this.unreadedLogs = this.logs.length
  },

  methods: {
    onClickCell({ position, rank }) {
      console.log(position, rank);
    },

    onConnectRoom() {
      this.$socket.on('admin:tick', ({ metrics }) => {
        this.metrics = metrics;
        console.log(this.metrics[0].value, this.metrics[0].recurentOperation);
      });

      this.$socket.on('room:entities', (entities) => {
        entities.forEach((entity) => {
          this.entities[entity.position[0] + entity.position[1] * 32] = {
            ...entity,
            color: '#2979ff',
          };
        });
      });

      this.$socket.on('entity:add', (entity) => {
        this.entities[entity.position[0] + entity.position[1] * 32] = {
          ...entity,
          color: '#2979ff',
        };
      });

      this.$socket.on('entity:remove', (entity) => {
        this.entities[entity.position[0] + entity.position[1] * 32] = null;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-room {
  header {
    .badge {
      // TODO: Add scss variables
      width: 19px;
      height: 19px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 2px;
      right: 2px;
      background: red;
      border-radius: 50%;
      color: white;
      font-size: 10px;
      font-style: normal;
      font-weight: 600;
      letter-spacing: -.05em;
    }
  }

  .md-card {
    margin-bottom: 32px;
  }
  &__title {
    margin-bottom: 16px;
    margin-top: 0;
  }
  .md-tabs-navigation {
    margin-bottom: 32px;
  }

  .metrics {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .metric {
      width: 48%;
    }
  }
}
</style>
