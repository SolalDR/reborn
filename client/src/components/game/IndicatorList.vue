<template>
  <div class="indicator-list">
    <div v-for="(indicator, index) in list"
         :key="index"
         class="indicator"
         @mouseover="indexHovered = index"
         @mouseleave="indexHovered = null">
      <img :src="icons[indicator.slug]" :alt="indicator.name">
      <span>{{ indicator.value }}</span>

      <transition name="fade">
        <hover-infos v-if="indexHovered === index" :text="indicator.displayName"/>
      </transition>
    </div>

    <img @click="$emit('showSettings', true)" :src="icons.settings" alt="Paramètres" class="indicator">
  </div>
</template>

<script>
import money from '../../assets/icons/game/common/money.svg';
import population from '../../assets/icons/game/common/population.svg';
import settings from '../../assets/icons/game/common/settings.svg';
import HoverInfos from './HoverInfos';

export default {
  name: 'indicator-list',
  components: {
    HoverInfos
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      icons: {
        money,
        population,
        settings,
      },
      indexHovered: false,
    };
  },
};
</script>

<style lang="scss">
  .indicator-list {
    @include useFlex();

    .indicator {
      position: relative;
      @include useFlex();
      margin-right: 3rem;

      &:last-child,
      &:last-child img {
        margin-right: 0;
      }

      img {
        margin-right: 1rem;
      }

      span {
        @include fontSize(18);
        font-family: "DrukText-Medium";
      }
    }
  }
</style>
