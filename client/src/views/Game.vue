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

  created() {
    this.$socket.on('entity:add', () => {
      console.log('Add entity');
    });

    this.$bus.$emit('hello');

    this.$socket.on('entity:remove', () => {
      console.log('Remove entity');
    });

    this.$socket.on('entity:update', () => {
      console.log('Update entity');
    });

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
