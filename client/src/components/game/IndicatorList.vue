<template>
  <div class="indicator-list">
    <div v-for="(indicator, index) in list"
      :key="index"
      class="indicator">
      <label>{{ indicator.name }}</label>
      <span>{{ indicator.value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>
