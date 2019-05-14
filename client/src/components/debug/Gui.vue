<template>
  <div class="guiContainer"/>
</template>

<script>
import Vue from 'vue';
import GUI, { initGui, destroyGui } from '../../plugins/GUI.js';

export default {
  mounted() {
    initGui();
    Vue.prototype.$gui = GUI;
  },

  beforeDestroy() {
    destroyGui();
  },
};
</script>
