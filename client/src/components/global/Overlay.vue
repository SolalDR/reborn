<template>
  <div class="overlay" :class="{'overlay--transparent': isTransparent}">
    <div class="overlay-content">
      <div class="header">
        <slot name="header"></slot>
      </div>

      <slot></slot>

      <div class="overlay-content__footer footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'overlay',
  props: {
    isTransparent: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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

    &-content {
      text-align: center;

      &__footer {
        opacity: 0;
        animation: fadeInUp 2s cubic-bezier(0.82, 0.04, 0, 1.04) 1 2s;
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
