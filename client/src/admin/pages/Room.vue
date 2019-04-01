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
          <metric v-for="(metric, i) in metrics" :key="i" :metric="metric"/>
        </md-card-content>
      </md-card>


      <md-card class="grid">
        <md-card-header>
          <div class="md-title">Grille</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item grid__filter">
              <md-field>
                <label for="models">Models</label>
                <md-select v-model="selectedModels" name="models" id="models" multiple>
                  <md-option v-for="(model, i) in models" :key="'model'+i" :value="model.slug">
                    {{ model.name }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </div>

          <grid-component
            :size="[32, 32]"
            :cells="entities"
            :filtersModel="selectedModels"
            :filtersState="selectedStates"
            :filtersRole="selectedRoles"
            @clickCell="onClickCell($event)"
            />
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>

import models from '../../../../reborn/entity/models';
import GridComponent from './rooms/Grid.vue';
import Metric from '../components/Metric.vue';

export default {
  name: 'Room',

  components: {
    Metric,
    GridComponent,
  },

  data() {
    return {
      room: null,
      metrics: [],
      entities: new Array(32 * 32).fill(null),
      models,
      selectedModels: [],
      selectedStates: [],
      selectedRoles: [],
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
      this.onConnectRoom();
      console.log(JSON.parse(JSON.stringify(room)));
    });

    this.entities[42] = {
      model: 'tree',
      color: '#CCC',
    };
  },

  computed: {
    modelsName() {
      return this.models.map(model => model.name);
    },
  },

  methods: {
    onClickCell({ position, rank }) {
      console.log(position, rank);
    },

    onConnectRoom() {
      this.$socket.on('admin:tick', ({ metrics }) => {
        this.metrics = metrics;
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

<style lang="scss">
.admin-room {
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

  .header {
    display: none;
  }

  .grid {
    &__filter {
      max-width: 25%;
    }
  }
}
</style>
