<template>
  <div @click="$emit('setCurrentCategory', category.index)"
       @mouseover="isHovered = true"
       @mouseleave="isHovered = false"
       class="category"
       :class="{'category--current': isCurrent, 'category--hovered': isHovered}">
    <component :is="`${category.slug}-icon`" :is-filled="isCurrent || isHovered"/>
  </div>
</template>

<script>
import CityIcons from '../icons/city';
import NatureIcons from '../icons/nature';

export default {
  name: 'category',
  components: {
    ...CityIcons,
    ...NatureIcons,
  },
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
    overflow: hidden;
    @include useFlex();
    padding: .5rem .2rem;
    border: 2px solid transparent;

    svg {
      cursor: pointer;
      opacity: .3;
      width: 2rem;
      height: 2rem;
      transition: all .3s ease;
    }

    &--current,
    &--hovered {
      svg {
        opacity: 1;
      }
    }
  }
</style>
