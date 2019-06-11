<template>
  <div class="explanations">
    <div class="explanations__header header">
      <p class="explanations__title bold" v-html="$splitWithSpan(texts.title)"></p>
      <span class="explanations__score" v-html="$splitWithSpan(score.toString())"></span>
      <span class="explanations__suffix" v-html="$splitWithSpan(texts.suffix)"></span>

      <p v-for="(textLine, index) in explanations"
         :key="`explanations-text-${index}`"
         v-html="$splitWithSpan(textLine)"
         class="explanations__text"></p>

      <div class="explanations__actions">
        <p class="cta--bordered" @click="$emit('updateStatus', 'saving')">{{ texts.save }}</p>
        <p class="cta--bordered" @click="tryAgain">{{ texts.tryAgain }}</p>
      </div>
    </div>

    <div class="explanations__footer footer">
      <div class="explanations__share">
        <p>{{ texts.share }}</p>
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
import texts from '@/contents/game/explanations';

export default {
  name: 'explanations',
  props: {
    score: Number,
    endGameReason: String,
    tryAgain: Function,
  },
  data() {
    return {
      texts,
    };
  },
  computed: {
    explanations() {
      return texts.explanations[this.endGameReason][this.$game.player.role.name];
    },
  },
};
</script>

<style lang="scss">
  .explanations {
    &__header {
      top: 15rem;
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
      margin-bottom: $space-s;
      text-align: center;
    }

    &__actions {
      margin-top: 10rem;

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
