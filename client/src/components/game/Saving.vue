<template>
  <div class="saving">
    <div class="saving__header header">
      <h2 class="title--wide">Les survivants</h2>
    </div>

    <div class="saving__body">
      <leaderboard :collection="collection"/>
    </div>

    <div class="saving__footer footer">
      <transition name="fade">
        <div v-if="canSave" class="saving__save-form">
          <p class="saving__title">Vous avez survécu 999 ans</p>
          <input ref="inputName" type="text">
          <p @click="saveScore" class="cta--bordered">Valider</p>
        </div>
      </transition>

      <p @click="tryAgain" class="replay cta--bordered">Rejouer</p>
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
      const defaultName = 'Anonyme';

      const cityOpts = {
        cityName: this.name,
        natureName: defaultName,
      };

      const natureOpts = {
        cityName: defaultName,
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
        })
        .catch((error) => {
          console.error('Error while adding document to database:', error);
        });
    },
  },
};
</script>

<style lang="scss">
  .saving {
    &__header {
      width: 100%;
    }

    &__footer {
      width: 87rem;

      p,
      input {
        font-family: "DrukText-Bold";
      }

      p {
        text-transform: uppercase;
        @include fontSize(24);
      }

      input {
        outline: none;
        padding: 0 1.5rem;
        width: 27rem;
        height: 5.2rem;
        border: none;
        border-radius: 1rem;
        text-align: center;
        @include fontSize(18);
      }

      .replay {
        margin: 0 auto;
      }
    }

    &__save-form {
      width: 100%;
      @include useFlex(space-between);
      margin-bottom: 2rem;
    }
  }
</style>
