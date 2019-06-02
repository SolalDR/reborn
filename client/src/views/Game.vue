<template>
  <main class="game">
    <scene @mounted="onWebGLInit"/>

    <!-- IsStarting -->
    <transition name="fade">
      <overlay v-if="isStarting">
        <transition name="fade" mode="out-in">
          <loader v-if="status === 'loading'"/>
          <introduction v-if="status === 'pending'" @start="onPlayerReady"/>
          <countdown v-if="status === 'initializing'"/>
        </transition>
      </overlay>
    </transition>

    <!-- IsPlaying -->
    <div class="game__interface" v-if="interfaceVisible">
      <gauge-list :list="this.gauges"/>
      <years-counter :currentYear="year"/>
      <indicator-list :list="this.indicators" @showSettings="showSettings = true"/>
      <inventory :money="money" @selectModel="onSelectModel" @selectSkill="onSelectSkill"/>
      <model-infos :model="currentModel"/>
      <flash-news/>
      <transition name="fade">
        <settings v-if="showSettings" @closeSettings="showSettings = false"/>
      </transition>
    </div>

    <!-- IsEnded -->
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
      <p class="cta--bordered" @click="onRemoveItem">Delete <button @click.stop="selectedEntity = null">X</button></p>
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
import ModelInfos from '../components/game/ModelInfos';
import FlashNews from '../components/game/FlashNews';

export default {
  name: 'Game',
  components: {
    FlashNews,
    ModelInfos,
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
      currentSkill: null,
      currentCategory: null,
      gauges: null,
      indicators: null,
      year: 0,
      money: null,
      position: new THREE.Vector3(0, 0.1, 8),
      selectedEntity: null,
    };
  },

  sockets: {
    'entity:add': function (item) { this.onEntityAdd(item); },
    'entity:remove': function (item) { this.onEntityRemove(item); },
    'timeline:tick': function (args) { this.onTimelineTick(args); },
    'game:start': function (args) { this.onGameStart(args); },
    'game:end': function (args) { this.onGameEnd(args); },
    'notification:send': function () { this.onNotificationSend(); },
    'skill:start': function(args) { this.onSkillStart(args) },
    'skill:available': function(args) { this.onSkillAvailable(args) },
    'skill:unavailable': function(args) { this.onSkillUnavailable(args) },
  },

  created() {
    if (!this.$store.state.game) {
      this.$router.push('/');
      return;
    }
    this.status = 'loading';

    // Create game
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

    // Quand un utilisateur click sur un model du rack
    onSelectModel(model) {
      if (model) {
        // TODO: change to selectedModel
        this.currentSkill = null;
        this.currentModel = model;
      }
    },

    // Quand un utilisateur click sur un skill du rack
    onSelectSkill(skill) {
      if (skill) {
        // TODO: change to selectedModel
        this.currentModel = null;
        this.currentSkill = skill;
      }
    },

    onWebGLInit() {
      this.$store.commit('debug/log', { content: 'game: onWebGLInit', label: 'webgl' });
      this.$store.commit('debug/log', { content: 'game: pending', label: 'socket' });
      this.status = 'pending';

      this.$socket.emit('grid:ready', this.$webgl.map.grid.infos);

      // When clicking an empty cell
      this.$webgl.on('selectCell', item => this.onAddItem(item));

      // When clicking on clickMap
      this.$webgl.on('clickMap', item => this.onLaunchSkill(item));

      // When user click on an object in the scene
      this.$webgl.on('selectItem', (item) => {
        this.selectedEntity = item;
        if (this.$game.entityModels.get(item.model).role === 'nature' && this.$game.player.role.name === 'city') {
          this.onRemoveItem();
        }
      });

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

    onLaunchSkill(item) {
      console.log('onLaunchSkill: skill', this.currentSkill);
      if (!this.currentSkill) return;
      const params = { ...item, skill: this.currentSkill.slug, position: this.$webgl.map.grid.getCell(item.position)};

      if (!config.server.enabled) {
        const zone = this.$webgl.map.grid.captureZone(params.position, this.currentSkill.zoneRadius);
        this.onSkillStart({ ...params, gridCases: zone });
        return;
      }
      this.$store.commit('debug/log', { content: 'skill:start (emit)', label: 'socket' });
      this.$socket.emit('skill:start', params);
    },

    onAddItem(item) {
      if (!this.currentModel) return;
      const params = { ...item, model: this.currentModel.slug };
      if (!config.server.enabled) {
        this.onEntityAdd({ ...params, uuid: uuid(), states: ['mounted', 'living'] });
        return;
      }
      this.$store.commit('debug/log', { content: 'entity:add (emit)', label: 'socket' });
      this.$socket.emit('entity:add', params);
    },

    onRemoveItem() {
      const params = {
        model: this.selectedEntity.model,
        uuid: this.selectedEntity.uuid,
      };

      this.selectedEntity = null;
      if (!config.server.enabled) {
        this.onEntityRemove(params);
        return;
      }

      this.$store.commit('debug/log', { content: `entity:remove (emit) with uuid: ${params.uuid}`, label: 'socket' });
      this.$socket.emit('entity:remove', params);
    },

    /**
     * socket
     */
    onEntityAdd(item) {
      this.$store.commit('debug/log', { content: `entity:add (receive) with uuid: ${item.uuid}`, label: 'socket' });
      const model = this.$webgl.models[item.model];
      if (model) {
        this.$webgl.explosionEffect.mesh.position.set(item.position.x, item.position.y, item.position.z);
        this.$webgl.explosionEffect.explode({
          delay: 200,
          duration: 600,
        });

        item.gridCases.forEach(gridCaseInfos => {
          if (gridCaseInfos) {
            this.$webgl.map.grid.get(gridCaseInfos).reference = gridCaseInfos.reference;
          }
        });

        model.addItem({
          ...item,
          position: new THREE.Vector3(item.position.x, item.position.y, item.position.z),
          rotation: new THREE.Euler(item.rotation._x, item.rotation._y, item.rotation._z),
        });
      }
    },

    onEntityRemove({ model, uuid, gridCases }) {
      this.$store.commit('debug/log', { content: `entity:remove (receive) with uuid: ${uuid}`, label: 'socket' });
      this.$webgl.models[model].removeEntity(uuid);

      gridCases.forEach(gridCaseInfos => {
        this.$webgl.map.grid.get(gridCaseInfos).reference = null;
      });
    },


    onSkillStart(item) {
      const skillEffect = this.$webgl.skills.get(item.skill);
      if (!skillEffect) return;
      skillEffect.launch(item, this.$webgl);
    },

    onSkillAvailable(args) {
      console.log(args);
      // TODO
    },

    onSkillUnavailable(args) {
      console.log(args);
      // TODO
    },

    onTimelineTick({ metrics, elapsed }) {
      this.gauges = metrics.filter((metric) => {
        return this.$game.player.role.gauges.indexOf(metric.slug) >= 0;
      });

      this.indicators = metrics.filter((metric) => {
        return this.$game.player.role.indicators.indexOf(metric.slug) >= 0;
      });

      this.year = Math.floor(elapsed / 1000); // One year per second
      this.money = this.indicators.length > 0 ? this.indicators.find(indicator => indicator.name === 'Money').value : 0;
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
        if (this.$game.player.role.name === 'nature') {
          const entities = this.$webgl.fillRandom(['tree', 'rock', 'centenary_tree']);
          const interval = 5000 / entities.length;
          entities.forEach((entity, i) => {
            setTimeout(() => {
              this.$socket.emit('entity:add', entity);
            }, i * interval);
          });
        }
      }, Math.max(0, timeout - 5000));

      setTimeout(() => {
        this.$store.commit('debug/log', { content: 'game: playing', label: 'socket' });
        this.isStarting = false;
        this.status = 'playing';

        this.$sound.addSample('drum_slow', 2000, [
          { name: 'drum_slow_1', delay: 0 },
          { name: 'drum_slow_2', delay: 1500 },
        ]);

        this.$sound.addSample('drum_medium', 1500, [
          { name: 'drum_medium_1', delay: 0 },
          { name: 'drum_medium_2', delay: 1000 },
        ]);

        this.$sound.addSample('drum_fast', 1000, [
          { name: 'drum_fast_1', delay: 0 },
          { name: 'drum_fast_2', delay: 750 },
        ]);

        this.$sound.playSample('drum_slow');

        console.log(this.$sound);
      }, Math.max(0, timeout + 1));
    },

    onGameEnd(args) {
      this.isEnded = true;
      this.status = 'explanations';
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

    $padding: 3rem;

    .gauge-list {
      top: $padding;
      left: $padding;
    }

    .indicator-list {
      top: $padding;
      right: $padding;
    }

    .years-counter {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .inventory {
      bottom: calc(#{$padding} + 3.6rem);
      left: $padding;
    }

    .model-infos {
      bottom: $padding;
      left: $padding;
    }

    .flash-news {
      bottom: $padding;
      right: $padding;
    }
  }
}
</style>
