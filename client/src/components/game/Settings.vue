<template>
  <div class="settings__modal">
    <div @click="$emit('closeSettings')" class="overlay"></div>

    <div class="panel">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings',

  mounted() {
    document.addEventListener('keydown', this.closeSettings);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.closeSettings);
  },

  methods: {
    closeSettings(e) {
      if (e.key) this.$emit('closeSettings');
    },
    leaveGame() {
      console.log('leave game');
    },
  },
};
</script>

<style lang="scss" scoped>
  .settings__modal,
  .overlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .settings__modal {
    position: fixed;
    @include useFlex();

    .overlay {
      position: absolute;
      background-color: rgba(getColor(basics, black), .2);
    }

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
  }
</style>
