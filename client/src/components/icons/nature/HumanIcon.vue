<template>
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="48"
  height="47"
  viewBox="0 0 48 47">
    <path
    fill="none"
    fill-rule="evenodd"
    stroke="#000"
    stroke-width="2" d="M27.577 18.074A9.001 9.001 0 0 0 23.584 1a9 9 0 1 0-4.025 17.058C9.01 19.93 1 29.138 1 40.218V46h45.05v-5.783c0-11.048-7.967-20.236-18.473-22.143"/>
  </svg>
</template>

<script>
export default {
  name: 'human-icon',
  props: {
    isFilled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

