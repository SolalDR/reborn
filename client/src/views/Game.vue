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
      <!-- TODO: Bind metrics -->
      <div class="metrics">
        <metric v-for="(metric, index) in 2" :key="index" :metric="{}"/>
      </div>

      <!-- TODO: Bind currentYear value -->
      <div class="years-counter">
        <years-counter :currentYear="75"/>
      </div>

      <!-- TODO: Bind indicators -->
      <div class="indicators">
        <indicator v-for="(indicator, index) in 2" :key="index" :indicator="{}"/>
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
import Metric from '../components/game/Metric.vue';
import Indicator from '../components/game/Indicator.vue';
import Inventory from '../components/game/Inventory.vue';
import Settings from '../components/game/Settings.vue';
import YearsCounter from '../components/game/YearsCounter.vue';

export default {
  components: {
    YearsCounter,
    Settings,
    Indicator,
    Scene,
    Metric,
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
    };
  },

  sockets: {
    'entity:add': function (item) {
      const cluster = this.$webgl.clusters[item.model];
      if (cluster) {
        cluster.addItem({
          position: new THREE.Vector3(item.position.x, item.position.y, item.position.z),
          rotation: new THREE.Euler(item.rotation._x, item.rotation._y, item.rotation._z),
        });
      }
    },

    'game:start': function ({ startedAt }) {
      const now = Date.now();
      const timeout = startedAt - now;

      setTimeout(() => {
        this.status = 'initializing';
      }, Math.max(0, timeout - 5000));

      setTimeout(() => {
        this.status = 'playing';
      }, Math.max(0, timeout + 1));
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
      this.status = 'pending';
      this.$webgl.on('addItem', (item) => {
        this.$socket.emit('entity:add', {
          ...item,
          model: this.currentModel.slug,
        });
      });
    },

    onPlayerReady() {
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

    .metrics {
      top: 0;
      left: 0;
    }

    .years-counter {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .indicators {
      top: 0;
      right: 0;
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
