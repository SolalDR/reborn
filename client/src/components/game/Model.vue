<template>
  <div class="model" @click="$emit('setCurrentModel', model.index)">
    {{ model.name }}
  </div>
</template>

<script>
export default {
  name: 'model',
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .model {
    $size: 80px;

    overflow: hidden;
    @include useFlex();
    width: $size;
    height: $size;
    border-radius: 50%;
    background-color: rgba(getColor(basics, white), .7);
    border: 2px solid transparent;
    transition: all .3s ease;

    &--current{
      border: 2px solid getColor(basics, black);
    }
  }
</style>