<template>
  <div class="intro">
    <p class="intro__incarnate" v-html="$splitWithSpan(texts.title)"></p>

    <p class="intro__title title--wide" v-html="$splitWithSpan(name)"></p>
    <div v-for="(explanationGroup, index) in explanations"
         :key="`explanation-group-${index}`"
         class="intro__explanations">
      <p v-for="(explanation, index) in explanationGroup"
         :key="`explanation-${index}`"
         v-html="$splitWithSpan(explanation)"></p>
    </div>

    <div class="intro__footer footer">
      <div class="status">
        <transition name="fade" mode="out-in">
          <button v-if="!pending" @click="start" class="cta--bordered">{{ texts.start }}</button>
          <p v-if="pending">{{ texts.waiting }}</p>
        </transition>
      </div>

      <div class="tips">
        <div v-for="(tip, index) in tips[currentTipIndex]" :key="`tip-${index}`">
          <p v-html="$splitWithSpan(tip)" class="tip"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import texts from '@/contents/game/introduction';

export default {
  name: 'introduction',
  data() {
    return {
      currentTipIndex: 0,
      pending: false,
      texts,
    };
  },

  computed: {
    name() {
      return texts[this.$game.player.role.name].name;
    },

    explanations() {
      return texts[this.$game.player.role.name].explanations;
    },

    tips() {
      return texts.tips[this.$game.player.role.name];
    },
  },

  mounted() {
    setInterval(this.updateCurrentTipIndex, 8000);
  },

  methods: {
    start() {
      this.pending = true;
      this.$emit('start');
    },
    updateCurrentTipIndex() {
      const maxLength = texts.tips[this.$game.player.role.name].length - 1;
      this.currentTipIndex = this.currentTipIndex === maxLength ? 0 : this.currentTipIndex + 1;
    },
  },
};
</script>

<style lang="scss">
  .intro {
    margin-top: -20vh;

    &__incarnate {
      margin-bottom: $space-m;
      @include fontSize(36);
      text-transform: uppercase;
    }

    &__title {
      margin-bottom: $space-xl;
      @include fontSize(48);
    }

    &__explanations {
      margin: 0 auto $space-l;
      @include fontSize(18);
      line-height: 2.4rem;

    }

    &__footer {
      .status {
        margin-bottom: $space-xxl;

        p {
          padding: 1.2rem 0;
          @include fontSize(20);
        }
      }

      .tips {
        .tip {
          @include fontSize(16);
          @include letterBounce(8s, 0s, true);
          line-height: 2.2rem;
        }
      }
    }
  }
</style>
