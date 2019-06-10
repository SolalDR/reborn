<template>
  <main class="game">
    <scene @mounted="onWebGLInit"/>
    <div v-if="isLoading" class="game__loading-overlay"></div>

    <p v-if="status !== 'playing' && status !== 'initializing'"
       @click="muteAll"
       class="mute__cta cta"
       :class="{'mute__cta--muted': isMuted}">
      Chuuut
    </p>

    <!-- IsStarting -->
    <overlay v-if="isStarting" :appear="false" :is-transparent="!isLoading" :fade-out="true">
      <transition name="fade" mode="out-in">
        <introduction v-if="status === 'pending'" @start="onPlayerReady"/>
        <countdown v-if="status === 'initializing'"/>
      </transition>
    </overlay>

    <!-- IsPlaying -->
    <div class="game__interface" v-if="interfaceVisible">
      <gauge-list :list="this.gauges"/>
      <years-counter :currentYear="year"/>
      <indicator-list :list="this.indicators" @showSettings="showSettings = true"/>
      <inventory :money="money" @selectModel="onSelectModel" @hoveredModel="onHoverModel" @selectSkill="onLaunchSkill"/>
      <model-infos :current-model="currentModel" :hovered-model="hoveredModel"/>
      <flash-news/>

      <settings v-if="showSettings" @closeSettings="showSettings = false"/>
    </div>

    <!-- IsEnded -->
    <overlay v-if="isEnded" :fade-in="true">
      <transition name="fade" mode="out-in">
        <explanations v-if="status === 'explanations'"
                      :score="year"
                      :end-game-reason="endGameDatas.reason"
                      :tryAgain="tryAgain"
                      @updateStatus="updateStatus"/>

        <saving v-if="status === 'saving'"
                :score="year"
                :end-game-datas="endGameDatas"
                :tryAgain="tryAgain"
                @updateStatus="updateStatus"/>
      </transition>
    </overlay>

    <webgl-component :position="selectedEntity.position" v-if="selectedEntity" ref="destroy-bubble">
      <transition name="fade-scale" mode="out-in" appear>
        <webgl-destroy-bubble @click="onRemoveItem" v-if="selectedEntity"
          :model="selectedEntity.model"/>
      </transition>
    </webgl-component>

    <world-notification />
  </main>
</template>

<script>
import Vue from 'vue';
import generateUuid from '@/utils/uuid';
import Reborn from '../game';
import Scene from '../components/game/Scene.vue';
import Introduction from '../components/game/Introduction.vue';
import Countdown from '../components/game/Countdown.vue';
import GaugeList from '../components/game/GaugeList.vue';
import IndicatorList from '../components/game/IndicatorList.vue';
import Inventory from '../components/game/Inventory.vue';
import Settings from '../components/game/Settings.vue';
import YearsCounter from '../components/game/YearsCounter.vue';
import WebglComponent from '../components/game/WebglComponent.vue';
import WebglDestroyBubble from '../components/game/WebglDestroyBubble';
import Overlay from '../components/global/Overlay';
import Explanations from '../components/game/Explanations';
import Saving from '../components/game/Saving';
import config from '../config';
import ModelInfos from '../components/game/ModelInfos';
import FlashNews from '../components/game/FlashNews';
import WorldNotification from '../components/game/WorldNotification';

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
    Introduction,
    Countdown,
    WebglComponent,
    WebglDestroyBubble,
    WorldNotification,
  },

  data() {
    return {
      status: null, // null => pending => initializing => playing => explanations => saving => leaderboard
      isStarting: true,
      isEnded: false,
      isLoading: true,
      isMuted: false,
      showSettings: false,
      currentModel: null,
      hoveredModel: null,
      currentSkill: null,
      currentCategory: null,
      gauges: null,
      indicators: null,
      year: 0,
      money: null,
      position: new THREE.Vector3(0, 0.1, 8),
      selectedEntity: null,
      endGameDatas: {},
    };
  },

  sockets: {
    'entity:add': function (item) { this.onEntityAdd(item); },
    'entity:remove': function (item) { this.onEntityRemove(item); },
    'timeline:tick': function (args) { this.onTimelineTick(args); },
    'game:start': function (args) { this.onGameStart(args); },
    'game:end': function (args) { this.onGameEnd(args); },
    'notification:send': function () { this.onNotificationSend(); },
    'skill:start': function (args) { this.onSkillStart(args); },
    'skill:available': function (args) { this.onSkillAvailable(args); },
    'skill:unavailable': function (args) { this.onSkillUnavailable(args); },
    'rythm:change': function (args) { this.onRythmChange(args); },
  },

  created() {
    if (!this.$store.state.game) {
      this.$router.push('/');
      return;
    }
    this.status = 'pending';

    // Create game
    Vue.prototype.$game = new Reborn.Game({
      players: this.$store.state.game.players.map(p => new Reborn.Player(p)),
      seed: this.$store.state.game.seed,
    });
  },

  mounted() {
    window.addEventListener('click', () => {
      if (this.selectedEntity) this.selectedEntity = null;
    });
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
    // TODO: Create common method
    muteAll() {
      this.isMuted = !this.isMuted;
    },

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
        this.currentModel = model;
      }
    },

    onHoverModel(model) {
      this.hoveredModel = model;
    },

    onWebGLInit() {
      this.$store.commit('debug/log', { content: 'game: onWebGLInit', label: 'webgl' });
      this.$store.commit('debug/log', { content: 'game: pending', label: 'socket' });
      this.status = 'pending';
      this.$sound.play('ambiance_sea');

      this.isLoading = false;

      this.$socket.emit('grid:ready', this.$webgl.map.grid.infos);

      // When clicking an empty cell
      this.$webgl.on('selectCell', item => this.onAddItem(item));

      // When user click on an object in the scene
      this.$webgl.on('selectItem', (item) => {
        setTimeout(() => {
          this.selectedEntity = item;

          const modelRole = this.$game.entityModels.get(item.model).role;
          const playerRole = this.$game.player.role.name;

          if ((modelRole === 'nature' && playerRole === 'city') || (modelRole === null && playerRole === 'nature')) {
            this.onRemoveItem({ force: true });
          } else if (
            playerRole === 'nature' || (modelRole === null && playerRole === 'city')
          ) {
            this.selectedEntity = null;
          }
        }, 1);
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

    onLaunchSkill(skill) {
      const requestParams = { ...skill, skill: skill.slug };
      if (!config.server.enabled) {
        this.onSkillStart(requestParams);
        return;
      }
      this.$store.commit('debug/log', { content: 'skill:start (emit)', label: 'socket' });
      this.$socket.emit('skill:start', requestParams);
    },

    onAddItem(item) {
      if (!this.currentModel) return;
      const params = { ...item, model: this.currentModel.slug };
      if (!config.server.enabled) {
        this.onEntityAdd({ ...params, uuid: generateUuid(), states: ['mounted', 'living'] });
        return;
      }
      this.$store.commit('debug/log', { content: 'entity:add (emit)', label: 'socket' });
      this.$socket.emit('entity:add', params);
    },

    onRemoveItem({ force } = {}) {
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

        item.gridCases.forEach((gridCaseInfos) => {
          if (gridCaseInfos) {
            this.$webgl.map.grid.get(gridCaseInfos).reference = gridCaseInfos.reference;
          }
        });

        const prefix = `${this.$game.player.role.name}_add_`;
        const entityModel = this.$game.entityModels.get(item.model);
        if (this.$sound.has(prefix + entityModel.category)) {
          this.$sound.play(prefix + entityModel.category);
        } else {
          this.$sound.play(prefix + entityModel.role);
        }

        model.addItem({
          ...item,
          position: new THREE.Vector3(item.position.x, item.position.y, item.position.z),
          rotation: new THREE.Euler(item.rotation._x, item.rotation._y, item.rotation._z),
        });
      }
    },

    onEntityRemove({ model, uuid, gridCases }) {
      this.$store.commit('debug/log', { content: `entity:remove (receive) with uuid: ${uuid}`, label: 'socket' });

      const prefix = `${this.$game.player.role.name}_remove`;
      this.$sound.play(prefix);

      const entity = this.$webgl.models[model].getEntity(uuid);

      this.$game.entityModels.get(model).states.destruction.leaveModifiers.forEach((modifer) => {
        if (modifer.name === 'money') {
          this.$bus.$emit('world:notification', {
            content: modifer.value > 0 ? `+${modifer.value}` : modifer.value,
            position: entity.position,
          });
        }
      });

      this.$webgl.models[model].removeEntity(uuid);

      if (gridCases) {
        gridCases.forEach((gridCaseInfos) => {
          this.$webgl.map.grid.get(gridCaseInfos).reference = null;
        });
      } else {
        console.warn('Game:onEntityRemove: No gridcases');
      }
    },

    onSkillStart(item) {
      const skillEffect = this.$webgl.skills.get(item.skill);
      if (!skillEffect) return;
      skillEffect.launch(item, this.$webgl);
      this.$sound.play(`skill_${item.skill}`);
    },

    onSkillAvailable(args) {
      console.log(args);
      // TODO
    },

    onSkillUnavailable(args) {
      console.log(args);
      // TODO
    },

    onRythmChange(speed) {
      this.$sound.playSample(`drum_${speed}`);
    },

    onTimelineTick({ metrics, elapsed }) {
      this.gauges = metrics.filter((metric) => {
        return this.$game.player.role.gauges.indexOf(metric.slug) >= 0;
      });

      this.indicators = metrics.filter((metric) => {
        return this.$game.player.role.indicators.indexOf(metric.slug) >= 0;
      });

      this.year = Math.floor(elapsed / 1000); // One year per second

      if (this.indicators.length > 0) {
        if (this.indicators.find(indicator => indicator.slug === 'money')) {
          this.money = this.indicators.find(indicator => indicator.slug === 'money').value;
        } else {
          this.money = 0;
        }
      } else {
        this.money = 0;
      }
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

      this.$webgl.controls.rails.lookTo(new THREE.Vector3(0, 1, 0), { duration: 3000 }).on('end', () => {
        this.$webgl.controls.orbit.enabled = true;
      });

      setTimeout(() => {
        this.$store.commit('debug/log', { content: 'game: initializing', label: 'socket' });
        this.status = 'initializing';
        if (this.$game.player.role.name === 'nature' || !config.server.enabled) {
          const entities = this.$webgl.fillRandom(
            [
              'rock',
              'big_flower',
              // 'big_flower',
              // 'big_flower',
              // 'centenary_tree',
              'centenary_tree',
              'centenary_tree',
              // 'bush',
              // 'cactus',
              'cactus',
              // 'common_flower',
              'gem',
              // 'millenial_tree',
              'millenial_tree',
              'millenial_tree',
              // 'ore',
              // 'ore',
              'ore',
              // 'shrub',
              // 'tough_tree',
              // 'uranium_deposit',
            ],
          );
          const interval = 5000 / entities.length;
          entities.forEach((entity, i) => {
            setTimeout(() => {
              if (!config.server.enabled) {
                this.onEntityAdd({ ...entity, uuid: generateUuid(), states: ['mounted', 'living'] });
                return;
              }
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
      }, Math.max(0, timeout + 1));
    },

    onGameEnd(args) {
      this.endGameDatas = args;
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

  &__loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: getColor(mains, primary);
  }

  &__interface {
    position: static;

    & > div {
      position: absolute;
    }

    .gauge-list {
      top: $border-of-screen;
      left: $border-of-screen;
    }

    .indicator-list {
      top: $border-of-screen;
      right: $border-of-screen;
    }

    .years-counter {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .inventory {
      bottom: calc(#{$border-of-screen} + 3.6rem);
      left: $border-of-screen;
    }

    .model-infos {
      bottom: $border-of-screen;
      left: $border-of-screen;
    }

    .flash-news {
      bottom: $border-of-screen;
      right: $border-of-screen;
    }
  }
}
</style>
