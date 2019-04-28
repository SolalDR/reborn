<template>
  <div class="indicator">Indicator</div>
</template>

<script>
export default {
  name: 'indicator',
  props: {
    indicator: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .indicator {}
</style>
