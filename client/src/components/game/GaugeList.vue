<template>
  <transition name="fade-scale" appear>
    <div class="gauge-list">
      <div v-for="(gauge, index) in list"
           :key="index"
           class="gauge"
           @mouseover="indexHovered = index"
           @mouseleave="indexHovered = null">
        <gauge-icon :percent="gauge.value"
              :icon-name="gauge.slug"
              @mouseover.native="onMouseEnter(gauge, index)"/>

        <transition name="fade">
          <hover-infos v-if="indexHovered === index" :text="gauge.displayName"/>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import GaugeIcon from '../icons/GaugeIcon';
import HoverInfos from './HoverInfos';

export default {
  components: {
    GaugeIcon,
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
  methods: {
    onMouseEnter(gauge, index) {
      if (index === this.indexHovered) return;
      this.$sound.play(`gauge_${gauge.slug}`);
    },
  },
};
</script>

<style lang='scss'>
  .gauge-list {
    @include useFlex();
  }
</style>
