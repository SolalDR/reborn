<template>
  <div class="metric-list">
    <div v-for="(metric, index) in metrics"
      :key="index"
      class="metric">
      <span>{{ metric.name }} {{ metric.value }}</span>
      <input :value="metric.value" type="range"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      metrics: null,
    };
  },

  sockets: {
    'timeline:tick': function ({ metrics }) {
      this.metrics = metrics;
    },
  },
};
</script>

<style lang="scss">

</style>
