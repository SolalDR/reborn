<template>
  <main class="game">
    <scene @mounted="onWebGLInit"/>

    <transition name="fade">
      <overlay v-if="isStarting">
        <transition name="fade" mode="out-in">
          <loader v-if="status === 'loading'"/>
          <introduction v-if="status === 'pending'" @start="onPlayerReady"/>
          <countdown v-if="status === 'initializing'"/>
        </transition>
      </overlay>
    </transition>

    <div class="game__interface" v-if="interfaceVisible">
      <gauge-list :list="this.gauges"/>
      <indicator-list :list="this.indicators"/>

      <!-- TODO: Bind currentYear value -->
      <div class="years-counter">
        <years-counter :currentYear="year"/>
      </div>

      <inventory @selectModel="onSelectModel"/>

      <div @click="showSettings = true" class="settings-cta">
        Settings
      </div>
      <transition name="settings">
        <settings v-if="showSettings" @closeSettings="showSettings = false"/>
      </transition>
    </div>

    <transition name="fade">
      <overlay v-if="isEnded">
        <transition name="fade" mode="out-in">
          <explanations v-if="status === 'explanations'"
                        @updateStatus="updateStatus"
                        :tryAgain="tryAgain"/>

          <saving v-if="status === 'saving'"
                  @updateStatus="updateStatus"
                  :tryAgain="tryAgain"/>
        </transition>
      </overlay>
    </transition>

    <webgl-component :position="selectedEntity.position" v-if="selectedEntity">
      <p class="cta--bordered" @click="onRemoveItem">Delete</p>
    </webgl-component>
  </main>
</template>

<script>
import Vue from 'vue';
import uuid from '@/utils/uuid';
import Reborn from '../game';
import Loader from '../components/global/Loader.vue';
import Scene from '../components/game/Scene.vue';
import Introduction from '../components/game/Introduction.vue';
import Countdown from '../components/game/Countdown.vue';
import GaugeList from '../components/game/GaugeList.vue';
import IndicatorList from '../components/game/IndicatorList.vue';
import Inventory from '../components/game/Inventory.vue';
import Settings from '../components/game/Settings.vue';
import YearsCounter from '../components/game/YearsCounter.vue';
import WebglComponent from '../components/game/WebglComponent.vue';
import Overlay from '../components/global/Overlay';
import Explanations from '../components/game/Explanations';
import Saving from '../components/game/Saving';
import config from '../config';

export default {
  name: 'Game',
  components: {
    Saving,
    Explanations,
    Overlay,
    YearsCounter,
    Settings,
    GaugeList,
    IndicatorList,
    Scene,
    Inventory,
    Loader,
    Introduction,
    Countdown,
    WebglComponent,
  },

  data() {
    return {
      status: null, // null => loading => pending => initializing => playing => explanations => saving => leaderboard
      isStarting: true,
      isEnded: false,
      showSettings: false,
      currentModel: null,
      currentCategory: null,
      gauges: null,
      indicators: null,
      year: 0,
      position: new THREE.Vector3(0, 0.1, 8),
      selectedEntity: null,
    };
  },

  sockets: {
    'entity:add': function (item) { this.onEntityAdd(item); },
    'timeline:tick': function (args) { this.onTimelineTick(args); },
    'game:start': function (args) { this.onGameStart(args); },
    'notification:send': function () { this.onNotificationSend(); },
  },

  created() {
    if (!this.$store.state.game) {
      this.$router.push('/');
      return;
    }

    this.status = 'loading';

    Vue.prototype.$game = new Reborn.Game({
      players: this.$store.state.game.players.map(p => new Reborn.Player(p)),
      seed: this.$store.state.game.seed,
    });
  },

  mounted() {
    document.addEventListener('keydown', this.onKeyDown);
    this.$bus.$on('shortcut', (code) => {
      switch (code) {
        case 27: this.toggleSettings(); break;
        case 70: this.fullscreen(); break;
        default: break;
      }
    });
  },

  computed: {
    interfaceVisible() {
      return this.status === 'playing';
    },
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown);
  },

  methods: {
    onKeyDown(event) {
      this.$bus.$emit('shortcut', event.which);
    },

    toggleSettings() {
      this.showSettings = !this.showSettings;
    },

    fullscreen() {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    },

    onSelectModel(model) {
      if (model) {
        this.currentModel = model;
      }
    },

    onWebGLInit() {
      this.$store.commit('debug/log', { content: 'game: onWebGLInit', label: 'webgl' });
      this.$store.commit('debug/log', { content: 'game: pending', label: 'socket' });
      this.status = 'pending';
      this.$webgl.on('addItem', (item) => this.onAddItem(item));
      this.$webgl.on('selectItem', (item) => this.selectedEntity = item)

      if (!config.server.enabled) {
        this.simulateGameStart();
      }
    },

    onPlayerReady() {
      this.$store.commit('debug/log', { content: 'game: onPlayerReady', label: 'webgl' });
      this.$socket.emit('player:ready');
    },

    updateStatus(status) {
      this.status = status;
    },

    tryAgain() {
      console.log('Try Again');
    },

    onAddItem(item) {
      const params = { ...item, model: this.currentModel.slug };
      if (!config.server.enabled) {
        this.onEntityAdd({ ...params, uuid: uuid(), states: ['mounted', 'living'] });
        return;
      }
      this.$socket.emit('entity:add', params);
    },

    onRemoveItem() {
      const params = {
        model: this.selectedEntity.model,
        uuid: this.selectedEntity.uuid
      };

      console.log(params);

      this.selectedEntity = null;
      if (!config.server.enabled) {
        this.onEntityRemove(params);
        return;
      }

      this.$socket.emit('entity:remove', params);
    },

    /**
     * socket
     */
    onEntityAdd(item) {
      this.$store.commit('debug/log', { content: 'entity:add (receive)', label: 'socket' });
      const model = this.$webgl.models[item.model];
      if (model) {
        model.addItem({
          ...item,
          position: new THREE.Vector3(item.position.x, item.position.y, item.position.z),
          rotation: new THREE.Euler(item.rotation._x, item.rotation._y, item.rotation._z),
        });
      }
    },

    onEntityRemove({ model, uuid }) {
      this.$webgl.models[model].removeEntity(uuid);
    },

    onTimelineTick({ metrics, elapsed }) {
      this.$store.commit('debug/log', { content: 'timeline:tick (receive)', label: 'socket' });

      this.gauges = metrics.filter((metric) => {
        return this.$game.player.role.gauges.indexOf(metric.slug) >= 0;
      });

      this.indicators = metrics.filter((metric) => {
        return this.$game.player.role.indicators.indexOf(metric.slug) >= 0;
      });

      this.year = Math.floor(elapsed / 1000); // One year per second
    },

    onGameStart({ startedAt }) {
      this.$store.commit('debug/log', { content: 'game:start (receive)', label: 'socket' });

      const now = Date.now();
      const timeout = startedAt - now;

      this.gauges = this.$game.player.role.gauges.map((gauge) => {
        return this.$game.metrics.get(gauge).infos;
      });

      this.indicators = this.$game.player.role.indicators.map((indicator) => {
        return this.$game.metrics.get(indicator).infos;
      });

      setTimeout(() => {
        this.$store.commit('debug/log', { content: 'game: initializing', label: 'socket' });
        this.status = 'initializing';
      }, Math.max(0, timeout - 5000));

      setTimeout(() => {
        this.$store.commit('debug/log', { content: 'game: playing', label: 'socket' });
        this.isStarting = false;
        this.status = 'playing';
      }, Math.max(0, timeout + 1));
    },

    onNotificationSend() {
      this.$store.commit('debug/log', { content: 'notification:send (receive)', label: 'socket' });
    },

    simulateGameStart() {
      setTimeout(() => {
        this.onGameStart({ startedAt: Date.now() + 7000 });
      }, 500);
    },
  },
};
</script>

<style lang="scss">
.game {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &__interface {
    position: static;

    & > div {
      position: absolute;
    }

    .gauge-list {
      top: 0;
      left: 0;
    }

    .indicator-list {
      top: 0;
      right: 0;
    }

    .years-counter {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .inventory {
      bottom: 0;
      left: 0;
    }

    .settings-cta {
      $size: 80px;
      bottom: 0;
      right: 0;
      @include useFlex();
      width: $size;
      height: $size;
      background-color: getColor(basics, white);
      border-radius: 50%;
    }
  }
}
</style>
