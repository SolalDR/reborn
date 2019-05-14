<template>
  <div class="explanations">
    <!-- TODO: Add clan name condition -->
    <div class="explanations__header header">
      <p class="explanations__title bold">La civilisation a survécu</p>
      <span class="explanations__score">999</span>
      <span class="explanations__suffix">ans</span>

      <p v-for="(text, index) in 2" :key="`explanations-text-${index}`" class="explanations__text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
    </div>

    <div class="explanations__footer footer">
      <div class="explanations__actions">
        <p class="cta--bordered" @click="$emit('updateStatus', 'saving')">Sauvegarder votre score</p>
        <p class="cta--bordered" @click="tryAgain">Rejouer</p>
      </div>

      <div class="explanations__share">
        <p>Partagez votre score sur les RS:</p>
        <!-- TODO: Add images -->
        <a href="https://twitter.com/" target="_blank">
          <img src="@/assets/icons/game/common/end/twitter.svg" alt="Twitter">
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <img src="@/assets/icons/game/common/end/facebook.svg" alt="Facebook">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'explanations',
  props: {
    tryAgain: Function,
  },
};
</script>

<style lang="scss">
  .explanations {
    &__header {
      top: 9rem;
    }

    &__title {
      margin-bottom: $space-m;
      text-transform: uppercase;
      @include fontSize(36);
    }

    &__score {
      line-height: 9.5rem;
      @include fontSize(96);
      font-family: "DrukWide-Super";
    }

    &__suffix {
      display: block;
      margin-bottom: $space-xl;
      text-transform: uppercase;
      @include fontSize(24);
      font-family: "DrukWide-Medium";
    }

    &__text {
      margin-bottom: $space-l;
      text-align: center;
    }

    &__actions {
      margin-bottom: $space-xxl;

      .cta--bordered {
        margin: 0 auto 2rem;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    &__share {
      @include useFlex();

      a {
        margin-left: 3rem;
      }
    }
  }
</style>
