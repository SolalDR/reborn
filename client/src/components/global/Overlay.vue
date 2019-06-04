<template>
  <transition name="overlay"
              :appear="appear ? true : false"
              :leave-to-class="fadeOut ? 'fade-leave-to' : 'overlay-leave-to'">
    <div class="overlay" :class="{'overlay--transparent': isTransparent}">
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
export default {
  name: 'overlay',
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
  },
};
</script>

<style lang="scss">
  .test {
    opacity: 0;
  }

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
      background-color: rgba(getColor(mains, primary), .75);
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
