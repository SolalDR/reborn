<template>
  <div>
    <!-- TODO: Add clan name condition -->
    <div class="leaderboard__header">
      <p class="leaderboard__title">Votre score</p>
      <span class="leaderboard__score">999</span>
    </div>

    <div class="leaderboard__body">
      <p class="leaderboard__title">Votre nom de survivant :</p>
      <input type="text">
      <p @click="saveScore" class="cta--bordered">Valider</p>
    </div>

    <div class="leaderboard__footer">
      <p @click="$emit('updateStatus', 'explanations')" class="cta--bordered">Retour</p>
    </div>
  </div>
</template>

<script>
const COLLECTION_NAME = 'leaderboard';

export default {
  name: 'saving',
  props: ['firestore'],
  data() {
    return {
      collection: [],
      status: 'explanations', // explanations => saving => listing
    };
  },
  methods: {
    saveScore() {
      const documentOpts = {
        score: 'score',
        cityName: 'CityName',
        natureName: 'NatureName',
      };

      this.firestore.collection(COLLECTION_NAME).doc('ROOMID').set(documentOpts)
        .then(() => {
          this.$emit('updateStatus', 'leaderboard');
        })
        .catch((error) => {
          console.error('Error while adding document to database:', error);
        });

      /*
      * 1_ Get 'leaderboard collection'
      * 2_ Check if roomId is present in response
      *   --> FALSE: add document in collection with roomID & object values
      *   --> TRUE: update name of player
      *
      * TODO: Use .onSnpashot for name updates
      * */
    },
  },
};
</script>
