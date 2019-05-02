<template>
  <div class="gauge-list">
    <div v-for="(gauge, index) in list"
      :key="index"
      class="gauge">
      <label>{{ gauge.name }}</label>
      <input :value="gauge.value" type="range"/>
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
