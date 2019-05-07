<template>
  <!-- TODO: Remove overlay component -->
  <overlay>
    <div class='leaderboard'>
      <transition name="fade" mode="out-in">
        <explanations v-if="status === 'explanations'" @updateStatus="updateStatus"/>

        <saving v-if="status === 'saving'" :firestore="firestore"  @updateStatus="updateStatus"/>

        <leaderboard v-if="status === 'leaderboard'" :collection="collection" @updateStatus="updateStatus"/>
      </transition>
    </div>
  </overlay>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Overlay from '../../global/Overlay';
import Explanations from './Explanations';
import Saving from './Saving';
import Leaderboard from './Leaderboard';

const COLLECTION_NAME = 'leaderboard';

export default {
  name: 'end',
  components: {
    Overlay,
    Explanations,
    Saving,
    Leaderboard,
  },
  data() {
    return {
      collection: [],
      status: 'explanations', // explanations => saving => leaderboard
    };
  },
  created() {
    this.initFirebase();
    this.getCollection();
  },
  methods: {
    initFirebase() {
      const firebaseConfig = {
        apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
        authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      };
      firebase.initializeApp(firebaseConfig);
      this.firestore = firebase.firestore();
    },
    getCollection() {
      this.firestore.collection(COLLECTION_NAME).get().then((querySnapshot) => {
        this.collection = querySnapshot.docs;
      });
    },
    updateStatus(status) {
      this.status = status;
    },
  },
};
</script>

<style lang='scss'>
  .leaderboard {}
</style>
