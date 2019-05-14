<template>
  <div class="overlay" :class="{'overlay--transparent': isTransparent}">
    <div class="overlay__content">
      <div class="header">
        <slot name="header"></slot>
      </div>

      <slot></slot>

      <div class="footer">
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

    &__content {
      text-align: center;
    }
  }
</style>
