<template>
  <canvas class="scene"></canvas>
</template>

<script>
import Vue from 'vue';
import WebGL from '../../webgl/WebGL';

export default {
  name: 'scene',
  mounted() {
    if (Vue.prototype.$webgl) {
      console.warn('Scene.vue: Already a webgl context in vue prototype');
    }

    Vue.prototype.$webgl = new WebGL({
      canvas: this.$el,
      store: this.$store,
    });

    this.$emit('mounted');
  },

  beforeDestroy() {
    Vue.prototype.$webgl = null;
  },
};
</script>
