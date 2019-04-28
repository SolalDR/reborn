<template>
  <main class="game">
    <scene v-if="$store.state.game" @mounted="onWebGLInit"/>
  </main>
</template>

<script>
import Scene from '../components/Scene.vue';
import AssetsManager from '../services/assets/Manager';
import Reborn from '../game';
import config from '../config';
import GameHelpers from './helpers/Game';

export default {
  data() {
    return {
      loaded: false,
    };
  },

  components: {
    Scene,
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
  },

  mounted() {
    // Load game assets
    AssetsManager.loader.addGroup({
      name: 'models',
      base: '/3d/models/',
      files: Reborn.models.map(({ slug }) => ({
        name: slug,
        path: `${slug}.glb`,
      })),
    });

    AssetsManager.loader.on('load:models', () => {
      this.$socket.emit('player:ready');

      // If server don't enabled launch game
      if (!config.server.enabled) {
        GameHelpers.simulateNewGame.call(this);
      }
    });

    AssetsManager.loader.loadGroup('models');
  },

  methods: {
    onWebGLInit() {
      this.$webgl.on('addItem', (item) => {
        this.$socket.emit('entity:add', {
          ...item,
          model: 'house'
        });
        console.log(item);
      });
    },
  },
};
</script>

<style lang="scss">
.game {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
