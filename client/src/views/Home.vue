<template>
  <div class="home">
    <video class="trailer" src="@/assets/video/trailer.mp4" autoplay playsinline muted loop></video>

    <transition name="fade" mode="out-in">
      <introduction v-if="status === 'introduction'" :skip-intro="skipIntro"/>
      <landing v-if="status === 'landing'"/>
      <about v-if="status === 'about'"/>
    </transition>

    <transition name="fade">
      <p v-if="status === 'landing'" class="about__cta cta" @click="status = 'about'">A Propos</p>
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
      status: 'introduction', // introduction => landing || about
    };
  },
  methods: {
    skipIntro() {
      this.status = 'landing';
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
      z-index: 1;
      position: fixed;
      bottom: 3rem;
      right: 3rem;
      text-transform: uppercase;
      @include fontSize(24);
    }
  }
</style>
