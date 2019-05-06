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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  &__title {
    font-size: 3.6rem;
  }

  &__count {
    font-size: 9.6rem;
  }
}
</style>
