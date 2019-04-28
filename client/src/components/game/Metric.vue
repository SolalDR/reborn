<template>
  <div class="metric">metric</div>
</template>

<script>
export default {
  name: 'metric',
  props: {
    metric: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .metric {}
</style>
