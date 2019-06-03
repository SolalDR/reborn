<template>
  <div class="home">
    <video class="trailer" src="@/assets/video/trailer.mp4" autoplay playsinline muted loop></video>

    <transition name="fade-down">
      <p class="mute__cta" :class="{'mute__cta--muted': isMuted}" @click="muteAll">Mute</p>
    </transition>

    <introduction v-if="status === 'introduction'" :skip-intro="goToLanding"/>
    <landing v-if="status === 'landing'"/>
    <about v-if="status === 'about'" :closeOverlay="goToLanding"/>

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
