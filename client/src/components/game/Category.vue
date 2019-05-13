<template>
  <div @click="$emit('setCurrentCategory', category.index)"
       @mouseover="isHovered = true"
       @mouseleave="isHovered = false"
       class="category"
       :class="{'category--current': isCurrent, 'category--hovered': isHovered}">
    <img src="" alt="">
  </div>
</template>

<script>
export default {
  name: 'category',
  data() {
    return {
      isHovered: false,
    };
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
    isCurrent: Boolean,
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

    img {
      cursor: pointer;
      opacity: .3;
      width: 2rem;
      height: 2rem;
      border: 2px solid getColor(basics, black);
      transition: all .3s ease;
    }

    &--current,
    &--hovered {
      img {
        opacity: 1;
        border: none;
        background-color: getColor(basics, black);
      }
    }
  }
</style>
