<template>
  <div class="hover-infos">{{ text }}</div>
</template>

<script>
export default {
  name: 'hover-infos',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .hover-infos {
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    transform: translate(calc(-50% - 1.5rem), 100%);
    padding: .5rem 1.5rem;
    background-color: rgba(getColor(basics, white), .5);
    border: 1px solid getColor(basics, black);
    border-radius: 1.3rem;
    text-align: center;
    @include fontSize(12);
    font-family: "DrukText-Medium";
  }
</style>
