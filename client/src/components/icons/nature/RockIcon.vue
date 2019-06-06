<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <path :fill="isFilled ? 'black' : 'none'"
          fill-rule="evenodd"
          stroke="#000"
          d="M20.585 21H.57L3.623 9l4.96-1 1.995-5h2.001V1h3.003l3.002 4z"/>
  </svg>
</template>

<script>
export default {
  name: 'rock-icon',
  props: {
    isFilled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
