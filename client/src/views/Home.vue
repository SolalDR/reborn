<template>
  <div class="home">
    <!-- TODO: Update Video src -->
    <!-- <video class="trailer" src="@/assets/video/trailer.mp4" autoplay playsinline muted loop></video> -->
    <img class="trailer" src="@/assets/img/TMP/background.jpg" alt="">

    <transition name="fade" mode="out-in">
      <!-- INTRODUCTION -->
      <overlay v-if="status === 'introduction'" :is-transparent="false">
        <p class="introduction__texts">Il y a plus d’un an désormais, la montée des eaux et des cataclysmes climatiques à répétition ont pratiquement effacé toute trace de vie humaine de la surface de la terre.</p>

        <button class="introduction__skip cta--bordered" @click="skipIntro">Passer l'introduction</button>
      </overlay>

      <!-- LANDING -->
      <div v-if="status === 'landing'" class="home__content" key="landing">
        <img class="logo" src="@/assets/img/logo.svg" alt="Logo Reborn">

        <div class="actions">
          <div class="actions__item">
            <button class="cta--bordered" @click="joinRoom">Jouer</button>

            <transition name="fade">
              <div v-if="showJoinRoomInfos" class="item-infos">
                <p>Personne dans les parages...</p>
                <p class="italic">Vous avez un ami dispo ?</p>
              </div>
            </transition>
          </div>

          <div class="actions__item">
            <button class="cta--bordered"
                    :class="{'cta--disabled': roomId}"
                    @click="createRoom">Challenger un ami</button>

            <transition name="fade">
              <div v-if="roomId" class="item-infos">
                <div class="invite-link">
                  <!-- TODO: Replace with inviteLink -->
                  <p class="room-id cta--bordered">{{ roomId }}</p>

                  <div class="copy-to-clipboard" @click="copyToClipboard">
                    <img src="@/assets/icons/home/copy-to-clipboard.svg" alt="Copier le lien">
                  </div>
                </div>

                <!-- TODO: Add animation -->
                <p v-if="!linkCopied" class="italic">Partagez ce lien avec un ami</p>
                <p v-else>Lien copié !</p>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- ABOUT -->
      <overlay v-if="status === 'about'">
        <div class="home__about">
          <p>Hello</p>
          <p @click="status = 'landing'">Retour</p>
        </div>
      </overlay>
    </transition>

    <transition name="fade">
      <p v-if="status === 'landing'" class="about__cta cta" @click="status = 'about'">A Propos</p>
    </transition>
  </div>
</template>

<script>
import config from '../config';
import Overlay from "../components/global/Overlay";

export default {
  name: 'home',
  components: {Overlay},
  data() {
    return {
      status: 'introduction', // introduction => landing,
      // Join
      showJoinRoomInfos: false,
      // Create
      roomId: null,
      inviteLink: null,
      linkCopied: false,
    };
  },
  sockets: {
    'room:connect': function (args) {
      this.onRoomConnect(args);
    },
    'game:create': function (args) {
      this.onGameCreate(args);
    },
  },
  methods: {
    skipIntro() {
      this.status = 'landing';
    },

    joinRoom() {
      this.showJoinRoomInfos = true;
    },

    createRoom() {
      if (!this.roomId) {
        this.$store.commit('debug/log', { content: 'home: createRoom', label: 'default' });
        this.roomId = Math.random().toString(36).substr(2, 9);

        this.inviteLink = `${window.location.origin}#/rooms/${this.roomId}/join`;

        if (!config.server.enabled) {
          this.$store.commit('debug/log', { content: 'simulate room:join (emit)', label: 'socket' });
          this.simulate();
        } else {
          this.$store.commit('debug/log', { content: 'room:join (emit)', label: 'socket' });
          this.$socket.emit('room:join', this.roomId);
        }
      }
    },

    copyToClipboard() {
      const tmpInput = document.createElement('input');
      document.body.appendChild(tmpInput);
      tmpInput.setAttribute('value', this.inviteLink);
      tmpInput.select();
      document.execCommand('copy');
      document.body.removeChild(tmpInput);

      this.linkCopied = true;
      setTimeout(() => {
        this.linkCopied = false
      }, 3000)
    },


    /**
     * socket
     */
    onRoomConnect({ playerId, verifiedRoomId }) {
      this.$store.commit('debug/log', { content: 'room:connect (receive)', label: 'socket' });
      this.$store.commit('setPlayer', playerId);
      this.$store.commit('setRoom', verifiedRoomId);
    },

    onGameCreate(game) {
      this.$store.commit('debug/log', { content: 'game:create (receive)', label: 'socket' });
      this.$store.commit('setGame', game);
      this.$router.push({
        name: 'game',
        params: {
          id: this.roomId,
        },
      });
    },

    simulate() {
      setTimeout(() => this.onRoomConnect({
        playerId: 1,
        verifiedRoomId: this.roomId,
      }), 100);

      setTimeout(() => this.onGameCreate({
        seed: Math.random(),
        status: 1,
        grid: [32, 32],
        startedAt: Date.now() + 5000,
        createdAt: Date.now(),
        players: [
          { id: 1, role: 'city', status: 1 },
          { id: 2, role: 'nature', status: 1 },
        ],
      }), 200);
    },
  },
};
</script>

<style lang="scss">
  .home {
    @include useFlex();
    width: 100vw;
    height: 100vh;

    .trailer {
      object-fit: cover;
      z-index: 0;
      position: absolute;
      min-width: 100vw;
      min-height: 100vh;
    }

    .introduction {
      &__texts {
        margin: 0 auto;
        max-width: 71.4rem;
        text-align: center;
        @include fontSize(30);
        line-height: 3.5rem;
      }

      &__skip {
        position: absolute;
        bottom: 6rem;
        left: 50%;
        transform: translateX(-50%);

        &:hover {
          transform: translateX(calc(-50% - .3rem)) scale(1.05);
        }
      }
    }

    &__content {
      z-index: 1;
      position: relative;
      width: 80vw;

      .logo {
        display: block;
        margin: 0 auto;
        width: 80%;
      }

      .actions {
        position: relative;
        @include useFlex(space-between, flex-start);
        margin: 7rem auto 0;
        width: 61rem;

        &__item {
          position: relative;
          text-align: center;

          .item-infos {
            position: absolute;
            bottom: 0;
            width: 100%;
            transform: translateY(calc(100% + 1.8rem));

            &:first-of-type {
              left: 0;
            }

            &:last-of-type {
              right: 0;
            }

            p {
              margin: 0;
              padding: 1.2rem 0;
              line-height: 2rem;
            }
          }
        }

        .invite-link {
          position: relative;

          .room-id {
            cursor: default;
            margin: 0;
            border: none;
            @include fontSize(18);

            &:hover {
              box-shadow: none;
              transform: inherit;
            }
          }

          .copy-to-clipboard {
            $size: 3.6rem;

            cursor: pointer;
            @include useFlex();
            position: absolute;
            bottom: -$size / 2;
            right: -$size / 2;
            width: $size;
            height: $size;
            background-color: getColor(basics, white);
            border: 1px solid getColor(basics, black);
            border-radius: 50%;
          }
        }
      }
    }

    .about__cta {
      z-index: 1;
      position: fixed;
      bottom: 3rem;
      right: 3rem;
      text-transform: uppercase;
      @include fontSize(24);
    }
  }
</style>
