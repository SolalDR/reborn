<template>
  <main class="game">
    <scene/>

    <div class="game__interface">
      <div class="metrics">
        <!-- TODO: Bind metrics -->
        <metric v-for="(metric, index) in 2" :key="index" :metric="{}"/>
      </div>

      <div class="years-counter">
        <!-- TODO: Bind currentYear value -->
        <years-counter :currentYear="75"/>
      </div>

      <div class="indicators">
        <!-- TODO: Bind indicators -->
        <indicator v-for="(indicator, index) in 2" :key="index" :indicator="{}"/>
      </div>

      <div class="entities">
        <!-- TODO: Bind entities -->
        <entity v-for="(entity, index) in 4" :key="index" :entity="{}"/>
      </div>

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
import Metric from '../components/game/Metric.vue';
import Entity from '../components/game/Entity.vue';
import Scene from '../components/game/Scene.vue';
import Indicator from '../components/game/Indicator.vue';
import Settings from '../components/game/Settings.vue';
import YearsCounter from '../components/game/YearsCounter.vue';

export default {
  components: {
    YearsCounter,
    Settings,
    Indicator,
    Scene,
    Entity,
    Metric,
  },

  data() {
    return {
      showSettings: false,
    };
  },

  sockets: {
    'entity:add': function () {
      console.log('Add entity');
    },

    'entity:remove': function () {
      console.log('Remove entity');
    },

    'entity:update': function () {
      console.log('Update entity');
    },

    'room:retrieve': function (results) {
      this.$store.commit('gameStart', results);
      this.$router.push({
        name: 'game',
        params: {
          id: results.roomId,
        },
      });
    },
  },

  created() {
    console.log(this.$store.state.playerId, window.localStorage.playerId);

    if (
      !this.$store.state.playerId && window.localStorage.playerId
      && !this.$store.state.roomId && window.localStorage.roomId
    ) {
      console.log('Need to retrieve room');
      this.$socket.emit('room:retrieve', this.$store.state.roomId);
    }
  },

  methods: {
    /*
    * TODO: Add shortcutsa
    * F1, F2, F3, F4 --> select currentCategory
    * 1, 2, 3, 4 --> select currentEntity
    * Escape: Open settings
    * F: Fullscreen
    * */
  },
};
</script>

<style lang="scss">
.game {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &__interface {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

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

    .entities {
      @include useFlex(space-between);
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px;
      width: 400px;
      border-radius: 50px;
      background-color: rgba(getColor(basics, white), .5);
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
