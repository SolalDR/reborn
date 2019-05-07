<template>
  <div>
    <!-- TODO: Add clan name condition -->
    <div class="leaderboard__header">
      <p class="leaderboard__title">La civilisation a survécu</p>
      <span class="leaderboard__score">999</span>
    </div>

    <div class="leaderboard__body">
      <p v-for="(text, index) in 3" :key="`leaderboard-text-${index}`" class="leaderboard__text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto autem dignissimos ducimus.
      </p>

      <div class="leaderboard__actions">
        <p class="cta--bordered" @click="$emit('updateStatus', 'saving')">Sauvegarder votre score</p>
        <p class="cta--bordered" @click="tryAgain">Rejouer</p>

        <!-- TODO: REMOVE THIS -->
        <p class="cta--bordered" @click="$emit('updateStatus', 'leaderboard')">Listing</p>
      </div>
    </div>

    <div class="leaderboard__footer leaderboard__share">
      <p>Partagez votre score sur les RS:</p>
      <!-- TODO: Add images -->
      <span>TW</span>
      <span>FB</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'explanations',
  methods: {
    tryAgain() {
      console.log('Try Again');
    },
  },
};
</script>
