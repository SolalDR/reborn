<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22">
    <path :fill="isFilled ? 'black' : 'none'"
          fill-rule="evenodd"
          stroke="#000"
          d="M20.764 16.955l-5.655-5.65h2.797l-5.323-5.319h3.191L10.784 1l-4.99 4.986h3.13l-5.322 5.319H6.46l-5.656 5.65h8.45V21h2.994v-4.045z"/>
  </svg>
</template>

<script>
export default {
  name: 'tree-icon',
  props: {
    isFilled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
