<template>
  <div class="gauge-list">
    <div v-for="(gauge, index) in list"
        :key="index"
        class="gauge"
        @mouseover="indexHovered = index"
        @mouseleave="indexHovered = null">
      <component :is="`${gauge.slug}-icon`"/>
      <div class="gauge-fill" :style="{'height': `${gauge.value}%`}"></div>

      <transition name="fade">
        <hover-infos v-if="indexHovered === index" :text="gauge.displayName"/>
      </transition>
    </div>
  </div>
</template>

<script>
import HoverInfos from './HoverInfos';
import EnergyIcon from '../icons/city/EnergyIcon';
import FoodIcon from '../icons/city/FoodIcon';
import SatisfactionIcon from '../icons/city/SatisfactionIcon';
import BiodiversityIcon from '../icons/nature/BiodiversityIcon';
import CivilisationIcon from '../icons/nature/CivilisationIcon';
import PurityIcon from '../icons/nature/PurityIcon';

export default {
  components: {
    PurityIcon,
    CivilisationIcon,
    BiodiversityIcon,
    SatisfactionIcon,
    FoodIcon,
    EnergyIcon,
    HoverInfos,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      indexHovered: false,
    };
  },
};
</script>

<style lang='scss'>
  .gauge-list {
    @include useFlex();

    .gauge {
      position: relative;
      margin-right: 3rem;

      &:last-of-type {
        margin-right: 0;
      }

      &-fill {
        z-index: 0;
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 50%;
        transform: translateX(-50%);
        background-color: getColor(mains, secondary);
      }
    }
  }
</style>
