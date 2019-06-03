<template>
  <overlay :is-transparent="false">
    <template #default>
      <p v-for="text in introTexts[currentIndex]" v-html="formatText(text)" class="introduction__text"></p>
    </template>

    <template #footer>
      <button class="introduction__skip cta--bordered" @click="skipIntro">Je sais, je sais</button>
    </template>
  </overlay>
</template>

<script>
import introTexts from '@/contents/introduction-texts'
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
      introTexts: introTexts,
    };
  },
  mounted() {
    const updateInterval = 8000;

    this.interval = setInterval(() => {
      this.updateCurrentIndex();
    }, updateInterval)
  },
  methods: {
    updateCurrentIndex() {
      if (this.currentIndex < this.introTexts.length - 1) {
        this.currentIndex++;
      } else {
        this.skipIntro();
        clearInterval(this.interval);
      }
    },
    formatText(text) {
      const regex = /([^\x00-\x80]|\w|\.|\,|\-|\?)/g;
      return text.replace(regex, '<span class="letter">$&</span>');
    },
  },
};
</script>

<style lang="scss">
  .introduction {
    &__text {
      $animation-duration: 8s;

      margin: 0 auto;
      text-align: center;
      @include fontSize(30);
      line-height: 4.5rem;
      animation: scaleContent $animation-duration ease-in infinite;
      @include letterBounce($animation-duration);
    }

    &__skip {
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  @keyframes scaleContent {
    100% {
      transform: scale(1.3);
    }
  }
</style>
