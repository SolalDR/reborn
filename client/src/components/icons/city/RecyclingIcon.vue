<template>
  <svg width="48px" height="47px" viewBox="0 0 48 47" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Interface" stroke="none" stroke-width="1" :fill="isFilled ? 'black' : 'none'" fill-rule="evenodd">
      <g id="07_min_Interface_nature" transform="translate(-179.000000, -29.000000)" stroke="#000000" stroke-width="2">
        <g id="jauge_civilisation" transform="translate(180.000000, 30.000000)">
          <path d="M26.5774111,17.073762 C29.5496279,15.6025069 31.5939748,12.5420561 31.5939748,9.00309106 C31.5939748,4.03083392 27.5602413,0 22.584072,0 C17.6082031,0 13.5741693,4.03083392 13.5741693,9.00309106 C13.5741693,12.5294518 15.6044007,15.5804493 18.5593485,17.0577065 C8.0104042,18.9297492 -1.77635684e-13,28.138711 -1.77635684e-13,39.2174647 L-1.77635684e-13,45 L45.0495137,45 L45.0495137,39.2174647 C45.0495137,28.1693215 37.083258,18.9812169 26.5774111,17.073762" id="Fill-12"></path>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'recycling-icon',
  props: {
    isFilled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
