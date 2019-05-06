<template>
  <div class="overlay">
    <div class="overlay__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'overlay',
};
</script>

<style lang="scss" scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    @include useFlex();
    width: 100vw;
    height: 100vh;
    background-color: rgba(getColor(mains, primary), .75);

    &__content {
      text-align: center;
    }
  }
</style>
