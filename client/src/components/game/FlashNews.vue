<template>
  <transition name="fade-scale" appear>
    <div class="flash-news">
      <div class="flash-news__title">
        <p>Flash News</p>
      </div>

      <div class="flash-news__texts">
        <p>Les ressources sont bientôt limitées. Faites attention à votre consommation !</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'flash-news',
};
</script>

<style lang="scss">
.flash-news {
  @include useFlex();
  background-color: rgba(getColor(basics, white), .7);
  border: 2px solid getColor(basics, black);
  border-radius: 1rem;

  &__title {
    padding: 1.15rem;
    text-align: center;
    text-transform: uppercase;
    width: 12.5rem;
    border-right: 2px solid getColor(basics, black);

    p {
      @include fontSize(18);
      font-family: "DrukText-Super";
    }
  }

  &__texts {
    overflow: hidden;
    padding: 0 1.5rem;
    width: 36rem;

    p {
      width: max-content;
      @include fontSize(14);
      font-family: "DrukText-Bold";
      animation: translate-text 10s infinite linear;

      @keyframes translate-text {
        0% {
          transform: translateX(calc(100% + 1.5rem));
        }
        100% {
          transform: translateX(calc(-100% - 1.5rem));
        }
      }
    }
  }
}
</style>
