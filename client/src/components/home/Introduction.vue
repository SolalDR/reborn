<template>
  <overlay :is-transparent="false">
    <template #default>
      <p class="introduction__texts">Il y a plus d’un an désormais, la montée des eaux et des cataclysmes climatiques à répétition ont pratiquement effacé toute trace de vie humaine de la surface de la terre.</p>
    </template>

    <template #footer>
      <button class="introduction__skip cta--bordered" @click="skipIntro">Passer l'introduction</button>
    </template>
  </overlay>
</template>

<script>
import Overlay from '../global/Overlay';

export default {
  name: 'introduction',
  components: {
    Overlay,
  },
  props: {
    skipIntro: Function,
  }
};
</script>

<style lang="scss" scoped>
  .introduction {
    &__texts {
      margin: 0 auto;
      max-width: 71.4rem;
      text-align: center;
      @include fontSize(30);
      line-height: 3.5rem;
    }

    &__skip {
      &:hover {
        transform: scale(1.05);
      }
    }
  }
</style>
