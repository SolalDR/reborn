<template>
  <overlay>
    <div class='leaderboard'>
      <p>Hello</p>
    </div>
  </overlay>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Overlay from '../../global/Overlay';

export default {
  name: 'leaderboard',
  components: {
    Overlay,
  },
  data() {
    return {
      entries: [],
    };
  },
  created() {
    const firebaseConfig = {
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    };
    firebase.initializeApp(firebaseConfig);

    this.firestore = firebase.firestore();
    console.log(this.firestore.collection('leaderboard').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
      });
    }));

    /*
    * 1_ Get 'leaderboard collection'
    * 2_ Check if roomId is present in response
    *   --> FALSE: add document in collection with roomID & object values
    *   --> TRUE: update name of player
    *
    * TODO: Use .onSnpashot for name updates
    * */
  },
};
</script>

<style lang='scss'>
  .leaderboard {}
</style>
