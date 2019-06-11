<template>
  <overlay :appear="false" :is-transparent="false" :bottom-waves="true">
    <template #default>
      <div class="introduction__gifs">
        <img :src="gifs[currentIndex]" :alt="`Gif ${currentIndex + 1}`" class="diffuse">
        <img :src="gifs[currentIndex]" :alt="`Gif ${currentIndex + 1}`" class="mask">
      </div>

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
import Overlay from '../global/Overlay';

import gifs from '@/assets/img/home/gifs';
import texts from '@/contents/home/introduction';

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
      gifs: gifs,
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
  $height: 32rem;
  $animation-duration: 8s;

  .introduction {
    &__gifs {
      margin-top: -20vh;
      transform-origin: center center;
      width: 100%;
      height: $height;
      background-color: rgb(122, 226, 182);
      animation: gif-animation $animation-duration cubic-bezier(0, .01, 0, 1) infinite;

      @keyframes gif-animation {
        0% {
          opacity: 0;
          transform: translateY(6vh);
        }
        15% {
          opacity: 1;
          transform: translateY(0);
        }
        85% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(-6vh);
        }
      }

      img {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: $height !important;
      }

      .diffuse {
        filter: invert(100%);
        mix-blend-mode: screen;
      }

      .mask {
        mix-blend-mode: multiply;
      }
    }

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
