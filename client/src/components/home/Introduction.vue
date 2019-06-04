<template>
  <overlay :appear="false" :is-transparent="false" :bottom-waves="true">
    <template #default>
      <div class="introduction__texts">
        <p v-for="text in introTexts[currentIndex]" v-html="formatText(text)" class="text"></p>
      </div>
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
    }, updateInterval);
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
  $animation-duration: 8s;

  .introduction {
    &__texts {
      animation: scaleContent $animation-duration linear infinite;

      .text {
        margin: 0 auto;
        text-align: center;
        @include fontSize(30);
        line-height: 4.2rem;
        @include letterBounce($animation-duration, true);
      }
    }
  }

  @keyframes scaleContent {
    100% {
      transform: scale(1.3);
    }
  }
</style>
