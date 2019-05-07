<template>
  <div>
    <div class="leaderboard__header">
      <p>Meilleures survies</p>
    </div>

    <div class="leaderboard__body">
      <leaderboard :collection="collection"/>
    </div>

    <div class="leaderboard__footer">
      <p class="leaderboard__title">Votre nom de survivant :</p>
      <input type="text">
      <p @click="saveScore" class="cta--bordered">Valider</p>
      <p @click="$emit('updateStatus', 'explanations')" class="cta--bordered">Retour</p>
    </div>
  </div>
</template>

<script>
import Leaderboard from './Leaderboard';

const COLLECTION_NAME = 'leaderboard';

export default {
  name: 'saving',
  components: {
    Leaderboard,
  },
  props: ['firestore', 'collection'],
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
