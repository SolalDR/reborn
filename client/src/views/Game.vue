<template>
  <main class="game">
    <scene/>
  </main>
</template>

<script>
import Scene from '../components/Scene.vue';

export default {
  components: {
    Scene,
  },

  created() {
    this.$socket.on('entity:add', () => {
      console.log('Add entity');
    });

    this.$socket.on('entity:remove', () => {
      console.log('Remove entity');
    });

    this.$socket.on('entity:update', () => {
      console.log('Update entity');
    });
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
