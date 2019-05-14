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
import AlimentationIcon from '../icons/city/AlimentationIcon';
import FoodIcon from '../icons/city/FoodIcon';
import EnergyIcon from '../icons/city/EnergyIcon';
import RecyclingIcon from '../icons/city/RecyclingIcon';
import SatisfactionIcon from '../icons/city/SatisfactionIcon';
import PlantIcon from '../icons/nature/PlantIcon';
import RockIcon from '../icons/nature/RockIcon';
import SkillIcon from '../icons/nature/SkillIcon';
import TreeIcon from '../icons/nature/TreeIcon';

export default {
  name: 'category',
  components: {
    TreeIcon,
    SkillIcon,
    RockIcon,
    PlantIcon,
    SatisfactionIcon,
    RecyclingIcon,
    EnergyIcon,
    FoodIcon,
    AlimentationIcon,
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
