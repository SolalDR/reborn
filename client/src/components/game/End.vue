<template>
  <!-- TODO: Transfert this component in Game.vue -->
  <!-- TODO: Remove overlay component -->
  <overlay>
    <div class='leaderboard'>
      <transition name="fade" mode="out-in">
        <explanations v-if="status === 'explanations'" @updateStatus="updateStatus"/>

        <saving v-if="status === 'saving'"
                :firestore="firestore"
                :collection="collection"
                :collectionName="collectionName"
                @updateStatus="updateStatus"/>
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

export default {
  name: 'end',
  components: {
    Overlay,
    Explanations,
    Saving,
  },
  data() {
    return {
      collection: [],
      collectionName: 'leaderboard',
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
      this.firestore.collection(this.collectionName).get().then((querySnapshot) => {
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
