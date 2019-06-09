<template>
  <overlay :has-cross="true"
           :fade-in="true"
           :fade-out="true"
           @closeOverlay="$emit('closeSettings')">
    <template #header>
      <p class="title--wide">Paramètres</p>
    </template>

    <template #default>
      <div class="settings__section quality">
        <p class="settings__section-title bold">Qualité d'image</p>

        <div class="quality__items">
          <p>Basse</p>
          <p>Moyenne</p>
          <p>Haute</p>
        </div>
      </div>

      <div class="settings__section sound">
        <p class="settings__section-title bold">Son</p>

        <div class="range-group">
          <p class="label">Effets sonores</p>

          <div>
            <input type="range" min="0" max="100" value="100" class="range range--effects">
            <p class="mute">Mute</p>
          </div>
        </div>

        <div class="range-group">
          <p class="label">Musique</p>

          <div>
            <input type="range" min="0" max="100" value="100" class="range range--musics">
            <p class="mute">Mute</p>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <button @click="leaveGame" class="cta--bordered">Quitter la partie</button>
    </template>
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
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
  .cross {
    position: absolute;
    top: 76.4rem;
    right: 36.4rem;
    padding: 20px;
  }

  .settings__section {
    margin: 0 auto $space-xl;
    width: 84rem;

    &-title {
      margin-bottom: $space-l;
      text-transform: uppercase;
      @include fontSize(36);
    }

    .quality__items {
      @include useFlex(space-between);

      p {
        @include fontSize(24);
      }
    }

    .range-group {
      @include useFlex(space-between);
      margin-bottom: 3rem;

      &:last-of-type {
        margin-bottom: 0;
      }

      p {
        @include fontSize(24);
      }

      & > div {
        @include useFlex();

        .range {
          appearance: none;
          outline: none;
          overflow: hidden;
          display: block;
          margin-right: $space-m;
          width: 54rem;
          background-color: transparent;

          $size: 2.5rem;
          &::-webkit-slider-runnable-track {
            position: relative;
            height: $size;
            border: .2rem solid getColor(basics, black);
            border-radius: 1.8rem;
            background-color: getColor(basics, white);
          }

          &::-webkit-slider-thumb {
            appearance: none;
            cursor: pointer;
            position: relative;
            top: -.2rem;
            right: -.1rem;
            width: $size;
            height: $size;
            background-color: getColor(basics, black);
            border-radius: 100%;
          }
        }

        .mute {
          cursor: pointer;
          opacity: .3;
          transition: all .3s ease;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
