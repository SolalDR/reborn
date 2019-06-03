<template>
  <overlay :has-cross="true" :fade-out="true" @closeOverlay="closeOverlay">
    <template #header>
      <h2 class="title--wide">À propos</h2>
    </template>

    <template #default>
      <div class="about">
        <p class="about__title">Ce site a été réalisé par une magic team.</p>

        <div class="about__item">
          <p>Designers</p>

          <p>Allan Michel</p>
          <p>Matthieu Pajot</p>
        </div>

        <div class="about__item">
          <p>Développeurs</p>

          <p>Solal Revel</p>
          <p>Erwann Letue</p>
        </div>

        <p>Merci aux équipes pédagogiques de Gobelins pour leur aide dans le développement du projet.</p>
      </div>
    </template>
  </overlay>
</template>

<script>
import Overlay from '../global/Overlay';

export default {
  name: 'about',
  components: {
    Overlay,
  },
  props: ['closeOverlay'],
};
</script>

<style lang="scss" scoped>
  .about {
    max-width: 33rem;

    &__title,
    &__item {
      margin-bottom: $space-xl;
    }

    &__item {
      p {
        line-height: 2.2rem;
      }

      p:first-of-type {
        margin-bottom: $space-l;
      }
    }
  }
</style>
