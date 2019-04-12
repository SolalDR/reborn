<template>
  <div class="category" @click="$emit('setCurrentCategory', category.index)">
    {{ category.index }}
  </div>
</template>

<script>
export default {
  name: 'category',
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .category {
    $size: 38px;

    overflow: hidden;
    @include useFlex();
    width: $size;
    height: $size;
    background-color: rgba(getColor(basics, white), .7);
    border: 2px solid transparent;
    transition: all .3s ease;

    &--current{
      border: 2px solid getColor(basics, black);
    }
  }
</style>
