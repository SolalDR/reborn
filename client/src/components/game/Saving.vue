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
      <input ref="inputName" type="text">
      <p @click="saveScore" class="cta--bordered">Valider</p>
      <p @click="$emit('updateStatus', 'explanations')" class="cta--bordered">Retour</p>
    </div>
  </div>
</template>

<script>
import Leaderboard from './Leaderboard';

export default {
  name: 'saving',
  components: {
    Leaderboard,
  },
  props: ['firestore', 'collection', 'collectionName'],
  data() {
    return {
      canSave: true,
    };
  },
  methods: {
    saveScore() {
      const name = this.$refs.inputName.value;

      if (this.canSave && name) {
        const documentOpts = {
          score: 'score',
          cityName: 'CityName',
          natureName: 'NatureName',
        };

        this.firestore.collection(this.collectionName).doc('ROOMID').set(documentOpts)
          .then(() => {
            this.canSave = false;
            console.log('Added document');
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
      } else {
        console.log('Empty value', this.canSave);
      }
    },
  },
};
</script>
