<template>
  <div class="home">
    <video class="trailer" src="@/assets/video/trailer.mp4" autoplay playsinline muted loop></video>

    <p class="mute__cta" :class="{'mute__cta--muted': isMuted}" @click="muteAll">Chuuut</p>

    <introduction v-if="status === 'introduction'" :skip-intro="goToLanding"/>
    <landing v-if="status === 'landing'"/>
    <about v-if="status === 'about'" :close-overlay="goToLanding"/>

    <transition name="fade-up">
      <p v-if="status === 'landing'" class="about__cta cta--absolute" @click="status = 'about'">A Propos</p>
    </transition>
  </div>
</template>

<script>
import Introduction from '../components/home/Introduction';
import Landing from '../components/home/Landing';
import About from '../components/home/About';

export default {
  name: 'home',
  components: {
    Introduction,
    Landing,
    About,
  },
  data() {
    return {
      isMuted: false,
      status: 'introduction', // introduction => landing || about
    };
  },

  mounted() {
    // this.$sound.play('ambiance')
  },

  methods: {
    goToLanding() {
      this.status = 'landing';
    },
    // TODO: Create common method
    muteAll() {
      this.isMuted = !this.isMuted;
    },
  },
};
</script>

<style lang="scss">
  .home {
    @include useFlex();
    width: 100vw;
    height: 100vh;

    &__overlay {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    .trailer {
      object-fit: cover;
      z-index: 0;
      position: absolute;
      min-width: 100vw;
      min-height: 100vh;
    }

    .about__cta {
      bottom: $border-of-screen;
    }
  }
</style>
