<template>
  <div class="years-counter">{{ currentYear }}</div>
</template>

<script>
export default {
  name: 'years-counter',
  props: {
    currentYear: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .years-counter {}
</style>
