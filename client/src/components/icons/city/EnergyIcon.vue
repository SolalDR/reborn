<template>
  <svg width="54px" height="51px" viewBox="0 0 54 51" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Interfaces" stroke="none" stroke-width="1" :fill="isFilled ? 'black' : 'none'" fill-rule="evenodd">
      <g id="Interface_civilisation" transform="translate(-96.000000, -29.000000)" stroke="#000000" stroke-width="2">
        <g id="Group-10" transform="translate(30.000000, 30.000000)">
          <polygon id="Fill-8" points="117 0 103.5 0 83.13465 20.255469 92.3412 20.255469 78.55695 31.5085073 85.4874 31.5085073 72 45 101.06445 29.2578996 92.1651 29.2578996 109.4475 18.0048613 99 18.0048613"></polygon>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'energy-icon',
  props: {
    isFilled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
