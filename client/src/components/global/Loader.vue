<template>
  <div class="loader">
    <p>
      <span>C</span>
      <span>H</span>
      <span>A</span>
      <span>R</span>
      <span>G</span>
      <span>E</span>
      <span>M</span>
      <span>E</span>
      <span>N</span>
      <span>T</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'loader',
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
      @for $i from 1 to 11 {
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
