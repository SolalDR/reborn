<template>
  <div>
    <div class="leaderboard__header">
      <p>Meilleures survies</p>
    </div>

    <div class="leaderboard__body">
      <leaderboard :collection="collection"/>
    </div>

    <div class="leaderboard__footer">
      <transition name="fade">
        <div v-if="canSave">
          <p class="leaderboard__title">Votre nom de survivant :</p>
          <input ref="inputName" type="text">
          <p @click="saveScore" class="cta--bordered">Valider</p>
        </div>
      </transition>

      <p @click="$emit('updateStatus', 'explanations')" class="cta--bordered">Retour</p>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import Leaderboard from './Leaderboard';

export default {
  name: 'saving',
  components: {
    Leaderboard,
  },
  data() {
    return {
      canSave: true,
      collection: [],
      collectionName: 'leaderboard',
    };
  },
  created() {
    this.initFirebase();
    this.getCollection();

    // TODO: Update DocId
    this.roomDocument = this.firestore.collection(this.collectionName).doc('ROOMID');
    this.roomDocument.onSnapshot((doc) => {
      console.log(doc.data());
    });
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
      this.firestore.collection(this.collectionName).orderBy('score').get().then((querySnapshot) => {
        this.collection = querySnapshot.docs;
      });
    },
    saveScore() {
      this.name = this.$refs.inputName.value;

      if (this.canSave && this.name) {
        this.roomDocument.get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            this.updateName();
          } else {
            this.createDocument();
          }
        });
      }
    },
    updateName() {
      // TODO: Check key to modify depending role
      this.canSave = false;

      this.roomDocument.update({
        cityName: this.name,
      });

      this.getCollection();
    },
    createDocument() {
      const documentOpts = {
        // TODO: Add value for role
        score: 'score',
        cityName: this.name,
        natureName: 'NatureName',
      };

      this.roomDocument.set(documentOpts)
        .then(() => {
          this.canSave = false;
          console.log('Added document');
        })
        .catch((error) => {
          console.error('Error while adding document to database:', error);
        });
    },
  },
};
</script>
