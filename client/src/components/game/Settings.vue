<template>
  <overlay>
    <div @click="$emit('closeSettings')" class="panel__cross">X</div>

    <p>Réglages</p>

    <div>
      <p>Qualité d'image</p>
      <input type="range" min="0" max="2" value="1" class="range range--quality">
    </div>

    <div>
      <p>Son</p>
      <input type="range" min="0" max="100" value="100" class="range range--effects">
      <input type="range" min="0" max="100" value="100" class="range range--musics">
    </div>

    <button @click="leaveGame">Quitter la partie</button>
  </overlay>
</template>

<script>
import Overlay from '../global/Overlay';

export default {
  name: 'settings',
  components: {
    Overlay,
  },
  mounted() {
    document.addEventListener('keydown', this.closeSettings);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.closeSettings);
  },

  methods: {
    leaveGame() {
      console.log('leave game');
    },
  },
};
</script>

<style lang="scss" scoped>
  .panel {
    $padding: 20px;

    z-index: 1;
    position: relative;
    padding: $padding;
    width: 70vw;
    border-radius: 14px;
    text-align: center;
    background-color: getColor(basics, white);

    &__cross {
      position: absolute;
      top: $padding - 10px;
      right: $padding - 10px;
      padding: 20px;
    }
  }
</style>
