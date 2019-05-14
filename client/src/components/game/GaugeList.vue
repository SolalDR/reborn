<template>
  <div class="gauge-list">
    <div v-for="(gauge, index) in list"
        :key="index"
        class="gauge"
        @mouseover="indexHovered = index"
        @mouseleave="indexHovered = null">
      <img :src="gaugesIcons[gauge.slug]" alt="">
      <div class="gauge-fill" :style="{'height': `${gauge.value}%`}"></div>

      <transition name="fade">
        <hover-infos v-if="indexHovered === index" :text="gauge.displayName"/>
      </transition>
    </div>
  </div>
</template>

<script>
// CITY
import energy from '../../assets/icons/game/city/energy.svg';
import food from '../../assets/icons/game/city/food.svg';
import satisfaction from '../../assets/icons/game/city/satisfaction.svg';

// NATURE
import biodiversity from '../../assets/icons/game/nature/biodiversity.svg';
import civilisation from '../../assets/icons/game/nature/civilisation.svg';
import purity from '../../assets/icons/game/nature/purity.svg';

import HoverInfos from './HoverInfos';

export default {
  components: {HoverInfos},
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
  computed: {
    gaugesIcons() {
      const cityGauges = {
        energy,
        food,
        satisfaction
      };

      const natureGauges = {
        biodiversity,
        civilisation,
        purity
      };

      return this.$game.player.role.name === 'city' ? cityGauges : natureGauges;
    }
  }
};
</script>

<style lang="scss">
  .gauge-list {
    @include useFlex();

    .gauge {
      position: relative;
      margin-right: 3rem;

      &:last-of-type {
        margin-right: 0;
      }

      img {
        z-index: 1;
        position: relative;
      }

      &-fill {
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
