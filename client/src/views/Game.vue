<template>
  <main class="game">
    <scene/>
  </main>
</template>

<script>
import Scene from '../components/Scene.vue';
import AssetsManager from '../services/assets/Manager';
import Reborn from '../game';

export default {
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
    });

    AssetsManager.loader.loadGroup('models');
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
