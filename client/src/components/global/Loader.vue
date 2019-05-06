<template>
  <div class="loader">
    <p>
      <span>R</span>
      <span>E</span>
      <span>B</span>
      <span>O</span>
      <span>R</span>
      <span>N</span>
    </p>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    text: {
      type: String,
      default: 'is loading...',
    },
  },
};
</script>

<style lang="scss">
.loader {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;

  p {
    font-size: 4rem;
    margin: 2rem;

    span {
      display: inline-block;
      animation: {
        name: letterBounce;
        iteration-count: infinite;
        duration: 2s;
        timing-function: cubic-bezier(0.82, 0.04, 0, 1.04);
      }
      @for $i from 1 to 7 {
        &:nth-child(#{$i}) {
          animation-delay: $i*0.05s;
        }
      }
    }
  }
}


@keyframes letterBounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
