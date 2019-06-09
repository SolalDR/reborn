<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20">
    <path :fill="isFilled ? 'black' : 'none'"
          fill-rule="evenodd"
          stroke="#000"
          d="M13.814 0L0 11.933h10.535L5.58 20 21 7.933H8.302z"/>
  </svg>
</template>

<script>
export default {
  name: 'skill-icon',
  props: {
    isFilled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
