<template>
  <svg width="47px" height="48px" viewBox="0 0 47 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Interfaces" stroke="none" stroke-width="1" :fill="isFilled ? 'black' : 'none'" fill-rule="evenodd">
      <g id="Interface_civilisation" transform="translate(-181.000000, -29.000000)" stroke="#000000" stroke-width="2">
        <g id="Group-10" transform="translate(30.000000, 30.000000)">
          <path d="M185.75,0 C179.79755,0 174.9281,4.62407369 174.52955,10.4758333 C174.0719,4.62407369 169.20245,0 163.25,0 C157.0367,0 152,5.03705259 152,11.2507876 C152,14.0892863 153.0533,16.6802676 154.7876,18.6598062 L174.49925,45 L194.7683,17.9810087 C196.16915,16.1042273 197,13.7744142 197,11.2507876 C197,5.03705259 191.96315,0 185.75,0 Z" id="Fill-1"></path>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'satisfaction-icon',
  props: {
    isFilled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
