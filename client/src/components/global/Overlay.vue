<template>
  <transition name="overlay"
              :appear="appear ? true : false"
              :enter-class="fadeIn ? 'fade-enter' : 'overlay-enter'"
              :leave-active-class="fadeOut ? 'fade-leave-active' : 'overlay-leave-active'"
              :leave-to-class="fadeOut ? 'fade-leave-to' : 'overlay-leave-to'">
    <div class="overlay">
      <div class="overlay__background" :class="{'overlay__background--transparent': isTransparent}">
        <div class="waves-wrapper" :class="{'waves-wrapper--bottom': bottomWaves}">
          <div class="wave" :style="{'background-image': `url('${waveSrc}')`}"></div>
          <div class="wave" :style="{'background-image': `url('${waveReversedSrc}')`}"></div>
        </div>
      </div>

      <div class="overlay__content">
        <div class="cross" v-if="hasCross" @click="$emit('closeOverlay')">
          <span class="line"></span>
          <span class="line"></span>
        </div>

        <div class="overlay__header header">
          <slot name="header"></slot>
        </div>

        <div class="overlay__body">
          <slot></slot>
        </div>

        <div class="overlay__footer footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import waveSrc from '@/assets/img/home/wave.png';
import waveReversedSrc from '@/assets/img/home/wave-reversed.png';

export default {
  name: 'overlay',
  data() {
    return {
      waveSrc,
      waveReversedSrc,
    };
  },
  props: {
    appear: {
      type: Boolean,
      default: true,
    },
    fadeIn: {
      type: Boolean,
      default: false,
    },
    fadeOut: {
      type: Boolean,
      default: false,
    },
    isTransparent: {
      type: Boolean,
      default: true,
    },
    hasCross: {
      type: Boolean,
      default: false,
    },
    bottomWaves: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
  $opacity: .75;
  $animations-delay: 1s;

  .overlay {
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;

    &__background {
      z-index: 0;
      position: fixed;
      top: 0;
      left: 0;
      @include useFlex();
      width: 100vw;
      height: 100vh;
      background-color: getColor(mains, primary);
      transition: background-color .65s ease;

      &--transparent {
        background-color: rgba(getColor(mains, primary), $opacity);

        .overlay__waves {
          opacity: $opacity;
        }
      }

      .waves-wrapper {
        overflow: hidden;
        position: absolute;
        top: 1px;
        left: 0;
        width: 100%;
        height: 20vh;
        transform: translateY(-100%) translateZ(0);
        will-change: transform;

        @keyframes move-wave {
          0% {
            transform: translateX(0) translateZ(0);
          }
          50% {
            transform: translateX(-25%) translateZ(0);
          }
          100% {
            transform: translateX(-50%) translateZ(0);
          }
        }

        .wave {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 200%;
          height: 100%;
          background-repeat: repeat no-repeat;
          background-position: 0 bottom;
          transform-origin: center bottom;
          background-size: 50% 50%;

          &:first-of-type {
            bottom: 25px;
            animation: move-wave 3.5s linear infinite;
          }

          &:last-of-type {
            animation: move-wave 2s linear infinite;
          }
        }

        &--bottom {
          top: initial;
          bottom: 0;
          transform: translateY(100%) rotate(180deg);
        }
      }
    }

    &__content {
      z-index: 1;
      text-align: center;
      @include letterBounce(1.8s, $animations-delay);

      .cross {
        cursor: pointer;
        opacity: 0;
        position: fixed;
        top: 7rem;
        right: 10%;
        width: 4.3rem;
        height: 4.3rem;
        animation: cross-enter 1.8s cubic-bezier(0, .01, 0, 1) $animations-delay;
        animation-fill-mode: forwards;
        transition: transform .5s ease;

        @keyframes cross-enter {
          0% {
            top: 20rem;
          }
          100% {
            opacity: 1;
            top: 7rem;
          }
        }

        &:hover {
          transform: scale(1.2);
        }

        .line {
          position: absolute;
          top: 50%;
          left: 50%;
          display: block;
          width: .35rem;
          height: 100%;
          background-color: getColor(basics, black);

          &:first-of-type {
            transform: translateY(-50%) rotate(45deg);
          }

          &:last-of-type {
            transform: translateY(-50%) rotate(-45deg);
          }
        }
      }

      .footer {
        animation: fadeInUp 2s cubic-bezier(0.82, 0.04, 0, 1.04);

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            bottom: 0;
            transform: translate(-50%, 100%);
          }

          100% {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
