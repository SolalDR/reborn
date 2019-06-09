<template>
  <overlay :appear="false" :is-transparent="false" :bottom-waves="true">
    <template #default>
      <div class="introduction__texts">
        <p
          v-for="(text, index) in texts[currentIndex]"
          :key="`text-${index}`"
          v-html="$splitWithSpan(text)"
          class="text"></p>
      </div>
    </template>

    <template #footer>
      <button class="introduction__skip cta--bordered" @click="skipIntro">Je sais, je sais</button>
    </template>
  </overlay>
</template>

<script>
import texts from '@/contents/home/introduction';
import Overlay from '../global/Overlay';

export default {
  name: 'introduction',
  components: {
    Overlay,
  },
  props: {
    skipIntro: Function,
  },
  data() {
    return {
      currentIndex: 0,
      texts,
    };
  },
  mounted() {
    const updateInterval = 8000;

    this.interval = setInterval(() => {
      this.updateCurrentIndex();
    }, updateInterval);
  },
  methods: {
    updateCurrentIndex() {
      if (this.currentIndex < this.texts.length - 1) {
        this.currentIndex++;
      } else {
        this.skipIntro();
        clearInterval(this.interval);
      }
    },
  },
};
</script>

<style lang="scss">
  $animation-duration: 8s;

  .introduction {
    &__texts {
      animation: scaleContent $animation-duration linear infinite;

      .text {
        margin: 0 auto;
        text-align: center;
        @include fontSize(30);
        line-height: 4.2rem;
        @include letterBounce($animation-duration, 0s, true);
      }
    }
  }

  @keyframes scaleContent {
    100% {
      transform: scale(1.3);
    }
  }
</style>
