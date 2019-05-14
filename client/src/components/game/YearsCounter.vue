<template>
  <div class="years-counter">
    <img class="years-counter__background" src="@/assets/icons/game/common/countdown-bg.svg" alt="">

    <div class="years-counter__content">
      <img :src="imgPath" alt="">
      <span class="years-value">{{ currentYear }}</span>
      <img :src="imgPath" alt="">

      <div class="years-suffix">ans</div>
    </div>
  </div>
</template>

<script>
import cityCountdownIcon from '../../assets/icons/game/city/countdown-icon.svg';
import natureCountdownIcon from '../../assets/icons/game/nature/countdown-icon.svg';

export default {
  name: 'years-counter',
  props: {
    currentYear: {
      type: Number,
      required: true,
    },
  },
  computed: {
    imgPath() {
      return this.$game.player.role.name === 'city' ? cityCountdownIcon : natureCountdownIcon;
    },
  },
};
</script>

<style lang="scss" scoped>
.years-counter {
  &__content {
    @include useFlex(space-between);
    @include centerAbsolute(33%);
    width: 90%;

    .years-value,
    .years-suffix {
      font-family: "DrukWide-Medium";
    }

    .years-value {
      @include fontSize(48);
    }

    .years-suffix {
      @include centerAbsolute(120%);
      @include fontSize(18);
      text-transform: uppercase;
    }
  }
}
</style>
