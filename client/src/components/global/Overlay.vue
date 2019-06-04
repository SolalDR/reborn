<template>
  <transition name="overlay"
              :appear="appear ? true : false"
              :leave-to-class="fadeOut ? 'fade-leave-to' : 'overlay-leave-to'">
    <div class="overlay" :class="{'overlay--transparent': isTransparent}">
      <div class="overlay__waves" :class="{'overlay__waves--bottom': bottomWaves}">
        <div class="wave" :style="{'background-image': `url('${waveSrc}')`}"></div>
      </div>

      <div class="overlay__content">
        <div class="cross" v-if="hasCross" @click="$emit('closeOverlay')">
          <span class="line"></span>
          <span class="line"></span>
        </div>

        <div class="header">
          <slot name="header"></slot>
        </div>

        <slot></slot>

        <div class="footer" ref="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import waveSrc from '@/assets/img/home/wave.png';

export default {
  name: 'overlay',
  data() {
    return {
      waveSrc: waveSrc,
    };
  },
  props: {
    appear: {
      type: Boolean,
      default: true,
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

  .overlay {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    @include useFlex();
    width: 100vw;
    height: 100vh;
    background-color: getColor(mains, primary);

    &--transparent {
      background-color: rgba(getColor(mains, primary), $opacity);

      .overlay__waves {
        opacity: $opacity;
      }
    }

    &__waves {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 10vh;
      transform: translateY(-100%);

      @keyframes move_wave {
        0% {
          transform: translateX(0) scaleY(1)
        }
        50% {
          transform: translateX(-25%) scaleY(0.55)
        }
        100% {
          transform: translateX(-50%) scaleY(1)
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
        background-size: 50% 100px;
        animation: move_wave 5s linear infinite;
      }

      &--bottom {
        top: initial;
        bottom: 0;
        transform: translateY(100%) rotate(180deg);
      }
    }

    &__content {
      text-align: center;

      .cross {
        cursor: pointer;
        position: fixed;
        top: 10%;
        right: 10%;
        width: 4.3rem;
        height: 4.3rem;

        &:hover {
          .line {
            &:first-of-type {
              transform: translateY(-50%) rotate(225deg);
            }

            &:last-of-type {
              transform: translateY(-50%) rotate(-225deg);
            }
          }
        }

        .line {
          position: absolute;
          top: 50%;
          left: 50%;
          display: block;
          width: .35rem;
          height: 100%;
          background-color: getColor(basics, black);
          transition: all .5s ease;

          &:first-of-type {
            transform: translateY(-50%) rotate(45deg);
          }

          &:last-of-type {
            transform: translateY(-50%) rotate(-45deg);
          }
        }
      }

      .footer {
        opacity: 0;
        animation: fadeInUp 2s cubic-bezier(0.82, 0.04, 0, 1.04) 1 1.2s;
        animation-fill-mode: forwards;

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
