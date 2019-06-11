<template>
  <p
    @click="muteAll"
    class="mute__cta cta"
    :class="{'mute__cta--muted': isMuted}">
    Chuuut
  </p>
</template>

<script>
export default {
  data() {
    return {
      isMuted: this.$sound.muted,
    };
  },

  methods: {
    muteAll() {
      this.isMuted = !this.isMuted;
      if (this.isMuted) {
        this.$sound.mute();
      } else {
        this.$sound.unmute();
      }
    },
  },
};
</script>
