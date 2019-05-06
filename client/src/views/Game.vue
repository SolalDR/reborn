<template>
  <main class="game">

    <scene @mounted="onWebGLInit"/>

    <transition name="fade">
      <loader v-if="status === 'loading'"/>
    </transition>

    <transition name="fade">
      <tutorial v-if="status === 'pending'" @start="onPlayerReady"/>
    </transition>

    <countdown v-if="status === 'initializing'"/>

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

  </main>
</template>

<script>
import Vue from 'vue';
import Reborn from '../game';
import Loader from '../components/Loader.vue';
import Scene from '../components/game/Scene.vue';
import Tutorial from '../components/game/Tutorial.vue';
import Countdown from '../components/game/Countdown.vue';
import GaugeList from '../components/game/GaugeList.vue';
import IndicatorList from '../components/game/IndicatorList.vue';
import Inventory from '../components/game/Inventory.vue';
import Settings from '../components/game/Settings.vue';
import YearsCounter from '../components/game/YearsCounter.vue';

export default {
  components: {
    YearsCounter,
    Settings,
    GaugeList,
    IndicatorList,
    Scene,
    Inventory,
    Loader,
    Tutorial,
    Countdown,
  },

  data() {
    return {
      status: null, // null => loading => pending => initializing => playing
      showSettings: false,
      currentModel: null,
      currentCategory: null,
      gauges: null,
      indicators: null,
      year: 0,
    };
  },

  sockets: {
    'entity:add': function (item) {
      this.$store.commit('debug/log', { content: 'entity:add (receive)', label: 'socket' });
      const cluster = this.$webgl.clusters[item.model];
      if (cluster) {
        cluster.addItem({
          position: new THREE.Vector3(item.position.x, item.position.y, item.position.z),
          rotation: new THREE.Euler(item.rotation._x, item.rotation._y, item.rotation._z),
        });
      }
    },

    'timeline:tick': function ({ metrics, elapsed }) {
      this.$store.commit('debug/log', { content: 'timeline:tick (receive)', label: 'socket' });

      this.gauges = metrics.filter((metric) => {
        return this.$game.player.role.gauges.indexOf(metric.slug) >= 0;
      });

      this.indicators = metrics.filter((metric) => {
        return this.$game.player.role.indicators.indexOf(metric.slug) >= 0;
      });

      this.year = Math.floor(elapsed / 1000); // One year per second
    },

    'game:start': function ({ startedAt }) {
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
        this.status = 'playing';
      }, Math.max(0, timeout + 1));
    },

    'notification:send': function () {
      this.$store.commit('debug/log', { content: 'notification:send (receive)', label: 'socket' });
    },
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
      return this.status === 'initializing'
        || this.status === 'playing';
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
      this.$webgl.on('addItem', (item) => {
        this.$socket.emit('entity:add', {
          ...item,
          model: this.currentModel.slug,
        });
      });
    },

    onPlayerReady() {
      this.$store.commit('debug/log', { content: 'game: onPlayerReady', label: 'webgl' });
      this.$socket.emit('player:ready');
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
