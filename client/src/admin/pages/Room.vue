<template>
  <div class="admin-room">
    <h1 class="admin-room__title md-display-1" v-if="room">Room: {{ room.name }}</h1>

    <header>
      <md-tabs>
        <template slot="md-tab" slot-scope="{ tab }">
          {{ tab.label }} <i class="badge" v-if="tab.data.badge">{{ tab.data.badge }}</i>
        </template>

        <md-tab id="tab-overview" md-label="Overview">
          <overview-component v-if="room" :room="room"/>
        </md-tab>

        <md-tab id="tab-metrics" md-label="Metrics">
          <md-card>
            <md-card-header>
              <div class="md-title">Metrics</div>
            </md-card-header>

            <md-card-content class="metrics">
              <metric-component v-for="(metric, i) in metrics" :key="i" :metric="metric" class="metric"/>
            </md-card-content>
          </md-card>
        </md-tab>

        <md-tab
          id="tab-logs"
          md-label="Logs"
          :md-template-data="{ badge: unreadedLogs }"
          @click="unreadedLogs = 0">
          <md-card class="md-size-50 md-card--log">
            <md-card-header>
              <div class="md-title">Logs</div>
            </md-card-header>

            <md-card-content class="logs">
              <entry-component v-for="(entry, index) in entries" :key="`entry-${index}`" :entry="entry"/>
            </md-card-content>
          </md-card>
        </md-tab>
      </md-tabs>
    </header>

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
          @clickCell="onClickCell($event)"
          />
      </md-card-content>
    </md-card>

    <md-dialog
      v-if="currentCell && !!currentCell.entity"
      :md-active.sync="currentCell && !!currentCell.entity">
      <md-dialog-title>Souhaitez vous supprimer cette entité ?</md-dialog-title>
      <md-dialog-content>
        Entité de type "{{ currentCell.entity.model }}"<br>
        <p class="md-small">{{ currentCell.entity.uuid }}</p>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="currentCell = false">Annuler</md-button>
        <md-button class="md-primary" @click="onDeleteEntity()">Delete</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog
      v-if="currentCell && !currentCell.entity"
      :md-active.sync="currentCell && !currentCell.entity">
      <md-dialog-title>Créer une entité</md-dialog-title>

      <md-dialog-content>
        <div class="md-layout md-gutter">
          <md-field class="md-layout-item">
            <label for="model-modal">Model</label>
            <md-select v-model="entityModel" name="model-modal" id="model-modal">
              <md-option v-for="(model, i) in models" :key="'model-modal-'+i" :value="model.slug">
                {{ model.name }}
              </md-option>
            </md-select>
          </md-field>
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="currentCell = false">Close</md-button>
        <md-button class="md-primary" @click="onAddEntity()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import models from '../../../../reborn/entity/models';

import GridComponent from '../components/rooms/Grid.vue';
import EntryComponent from '../components/rooms/Entry.vue';
import MetricComponent from '../components/rooms/Metric.vue';
import OverviewComponent from '../components/rooms/Overview.vue';

export default {
  name: 'Room',

  components: {
    GridComponent,
    EntryComponent,
    MetricComponent,
    OverviewComponent,
  },

  data() {
    return {
      room: null,
      metrics: [],
      entities: new Array(32 * 32).fill(null),
      models,
      selectedModels: [],
      currentCell: null,
      entityModel: null,
      entries: [],
      unreadedLogs: 0,
    };
  },

  created() {
    this.$socket.emit('admin:listen', {
        token: this.$store.state.admin.token,
        name: this.$route.params.name,
    });

    this.$socket.on('admin:listen', (room) => {
      console.log('ON ADMIN LISTEN')
      this.room = room;
      this.onConnectRoom();
    });
  },

  beforeDestroy () {
    // Fixed double event trigger
    // TODO: Remove all 'removeAllListeners' & use Vue-socket.io
    console.log('REMOVED ALL EVENTS');
    this.$socket.removeAllListeners('admin:listen');
    this.$socket.removeAllListeners('admin:tick');
    this.$socket.removeAllListeners('room:entities');
    this.$socket.removeAllListeners('entity:add');
    this.$socket.removeAllListeners('entity:remove');
    this.$socket.removeAllListeners('history:list');
    this.$socket.removeAllListeners('history:update');
  },

  computed: {
    modelsName() {
      return this.models.map(model => model.name);
    },
  },

  methods: {
    onClickCell(cell) {
      if (this.currentCell) return;
      this.currentCell = cell;
    },

    onConnectRoom() {
      console.log('On connect Room:', this.$socket);

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
        if (!entity) return;
        this.entities[entity.position[0] + entity.position[1] * 32] = {
          ...entity,
          color: '#2979ff',
        };
      });

      this.$socket.on('entity:remove', (entity) => {
        if (!entity) return;
        this.entities[entity.position[0] + entity.position[1] * 32] = null;
      });

      this.$socket.emit('history:list');
      this.$socket.on('history:list', (entries) => {
        console.log('history:list', entries);
        if (!entries) return;
        this.entries = entries
        this.unreadedLogs = this.entries.length;
      });

      this.$socket.on('history:update', (entry) => {
        console.log('history:update', entry);
        if (!entry) return;
        this.entries.push(entry);
        this.unreadedLogs++;
      });
    },
    onAddEntity() {
      this.$socket.emit('entity:add', {
        position: this.currentCell.position,
        model: this.entityModel,
      });
      this.currentCell = false;
    },

    onDeleteEntity() {
      if (!this.currentCell) return;
      this.$socket.emit('entity:remove', this.currentCell.entity.uuid);
      this.currentCell = false;
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

    &--log {
      height: 60vh;

      .logs {
        overflow-y: scroll;
        height: 78%;
        line-height: 14px;
      }
    }
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
  .grid {
    &__filter {
      max-width: 25%;
    }
  }
}
</style>
