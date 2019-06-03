<template>
  <overlay :is-transparent="false">
    <template #default>
      <p class="introduction__text" v-html="formatText(introText)"></p>
    </template>

    <template #footer>
      <button class="introduction__skip cta--bordered" @click="skipIntro">Passer l'introduction</button>
    </template>
  </overlay>
</template>

<script>
import Overlay from '../global/Overlay';
import texts from '@/contents/introduction-texts'

export default {
  name: 'introduction',
  components: {
    Overlay,
  },
  props: {
    skipIntro: Function,
  },
  methods: {
    formatText(text) {
      const regex = /([^\x00-\x80]|\w|\.|\,)/g;
      return text.replace(regex, '<span>$&</span>');
    },
  },
  computed: {
    introText() {
      let index = 0;
      return texts[index];
    },
  },
};
</script>

<style lang="scss">
  .introduction {
    &__text {
      margin: 0 auto;
      max-width: 71.4rem;
      text-align: center;
      @include fontSize(30);
      line-height: 3.5rem;

      span {
        opacity: 0;
        display: inline-block;
        animation: {
          name: letterBounce;
          iteration-count: 1;
          duration: 2s;
          timing-function: cubic-bezier(0.82, 0.04, 0, 1.04);
        }
        animation-fill-mode: forwards;
        @for $i from 1 to 400 {
          &:nth-child(#{$i}) {
            animation-delay: $i*0.007s;
          }
        }
      }
    }

    &__skip {
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  @keyframes letterBounce {
    0% {
      opacity: 0;
      transform: translateY(200%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
