<template>
  <main class="game">
    <scene/>
  </main>
</template>

<script>
import Scene from '../components/Scene.vue';
import AssetsManager from '../services/assets/Manager';

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

  created() {
    AssetsManager.loader.addGroup({
      name: 'models',
      base: '/3d',
      files: [
        {
          name: 'tree',
          path: '/arbre_test.glb',
        },
        {
          name: 'maison',
          path: '/maison_test.glb',
        },
      ],
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
