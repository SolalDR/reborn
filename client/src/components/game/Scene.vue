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

    // Init webgl
    Vue.prototype.$webgl = new WebGL({
      canvas: this.$el,
      store: this.$store,
    });

    // Check if mounted
    let needLoad = 2;
    const checkWebGLMounted = () => {
      console.log('check webgl mounted');
      needLoad--;
      if (needLoad === 0) this.$emit('mounted');
    };
    this.$webgl.on('clusters:created', checkWebGLMounted);
    this.$webgl.on('map:created', checkWebGLMounted);

    this.$webgl.init();
  },

  beforeDestroy() {
    Vue.prototype.$webgl = null;
  },
};
</script>
