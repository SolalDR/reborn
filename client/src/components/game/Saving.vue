<template>
  <div>
    <div class="leaderboard__header">
      <p>Survivants</p>
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

      <p @click="tryAgain" class="cta--bordered">Rejouer</p>
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
  props: {
    tryAgain: Function,
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

    this.roomDocument = this.firestore.collection(this.collectionName).doc(this.$store.state.roomId);
    this.roomDocument.onSnapshot(() => {
      this.getCollection();
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
      this.canSave = false;

      this.roomDocument.update({
        [`${this.$game.player.role.name}Name`]: this.name,
      });

      this.getCollection();
    },
    createDocument() {
      const cityOpts = {
        cityName: this.name,
        natureName: '',
      };

      const natureOpts = {
        cityName: '',
        natureName: this.name,
      };

      const documentOpts = {
        score: 'score',
        ...this.$game.player.role.name === 'city' ? cityOpts : natureOpts,
      };

      this.roomDocument.set(documentOpts)
        .then(() => {
          this.canSave = false;
          this.getCollection();
          console.log('Added document');
        })
        .catch((error) => {
          console.error('Error while adding document to database:', error);
        });
    },
  },
};
</script>
