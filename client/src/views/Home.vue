<template>
  <div class="home">
    <video class="trailer" src="@/assets/video/trailer.mp4" autoplay playsinline muted loop></video>

    <transition name="fade">
      <div v-if="status === 'landing'" class="home__content" key="landing">
        <img class="logo" src="@/assets/img/logo.svg" alt="Logo Reborn">

        <div class="actions">
          <div class="actions__item">
            <button class="cta--bordered" @click="joinRoom">Jouer</button>
          </div>

          <div class="actions__item">
            <button class="cta--bordered" @click="createRoom">Challenger un ami</button>

            <transition name="fade">
              <div class="invite-link" v-if="roomId">
                <p class="room-id cta--bordered">{{ roomId }}</p>

                <div class="copy-to-clipboard" @click="copyToClipboard">
                  <img src="@/assets/icons/home/copy-to-clipboard.svg" alt="Copier le lien">
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>

    <router-link :to="{name: 'about'}" class="about__cta cta">A Propos</router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      status: 'intro',
      roomId: null,
      inviteLink: null,
    };
  },
  sockets: {
    'room:connect': function ({ playerId, verifiedRoomId }) {
      this.$store.commit('setPlayer', playerId);
      this.$store.commit('setRoom', verifiedRoomId);
    },
    'game:create': function (game) {
      this.$store.commit('setGame', game);
      this.$router.push({
        name: 'game',
        params: {
          id: this.roomId,
        },
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.status = 'landing';
    }, 1500);
  },
  methods: {
    joinRoom() {
      console.log('Join Room');
    },
    createRoom() {
      this.roomId = Math.random().toString(36).substr(2, 9);
      this.$socket.emit('room:join', this.roomId);
      this.inviteLink = `${window.location.origin}#/rooms/${this.roomId}/join`;
    },
    copyToClipboard() {
      const tmpInput = document.createElement('input');
      document.body.appendChild(tmpInput);
      tmpInput.setAttribute('value', this.inviteLink);
      tmpInput.select();
      document.execCommand('copy');
      document.body.removeChild(tmpInput);
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
      z-index: 0;
      position: absolute;
      min-width: 100vw;
      min-height: 100vh;
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

        .invite-link {
          position: absolute;
          bottom: -6rem;
          right: 0;

          .room-id {
            cursor: default;
            margin: 0;
            border: none;
            text-align: center;

            &:hover {
              box-shadow: none;
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
      top: 3rem;
      right: 3rem;
      text-transform: uppercase;
      @include fontSize(24);
    }
  }
</style>
