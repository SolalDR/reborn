<template>
  <div class="countdown">
    <p class="countdown__title">Création du terrain...</p>
    <p class="countdown__count">{{ countdown }}</p>
  </div>
</template>

<script>
export default {
  props: {
    startAt: {
      type: Number,
      default: 5,
    },

    finishAt: {
      type: Number,
      default: 0,
    },
  },


  data() {
    return {
      countdown: null,
      now: null,
    };
  },

  mounted() {
    this.countdown = this.startAt;
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
      }
    }, 1000);
  },
};
</script>

<style lang="scss">
.countdown {
  &__title {
    text-transform: uppercase;
    font-size: 3.6rem;
  }

  &__count {
    font-size: 9.6rem;
    font-family: "DrukWide-Super";
  }
}
</style>
