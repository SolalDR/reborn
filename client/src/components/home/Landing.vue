<template>
  <transition name="fade">
    <div class="landing" key="landing">
      <img class="logo" src="@/assets/img/home/logo.svg" alt="Logo Reborn">

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
                  <p class="room-id cta--bordered">{{ inviteLink }}</p>

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
  </transition>
</template>

<script>
import config from '../../config';

export default {
  name: 'landing',
  data() {
    return {
      showJoinRoomInfos: false,
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
    joinRoom() {
      this.showJoinRoomInfos = true;
    },

    createRoom() {
      if (!this.roomId) {
        this.$store.commit('debug/log', { content: 'home: createRoom', label: 'default' });
        this.roomId = Math.random().toString(36).substr(2, 9);

        // TODO: Update this when domain name is available
        // this.inviteLink = `${window.location.host}/#/${this.roomId}/join`;
        this.inviteLink = `reborn.land/#/${this.roomId}/join`;

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
        this.linkCopied = false;
      }, 3000);
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
          { id: 1, role: 'nature', status: 1 },
          { id: 2, role: 'city', status: 1 },
        ],
      }), 200);
    },
  },
};
</script>

<style lang="scss" scoped>
  $animation-duration: .8s;
  $delayed-value: .7s;

  @keyframes logo-fade-up {
    0% {
      transform: translateY(140px);
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes actions-fade-up {
    0% {
      transform: translateY(100px);
    }

    100% {
      opacity: 1;
    }
  }

  .landing {
    z-index: 1;
    position: relative;
    width: 80vw;

    .logo,
    .actions {
      opacity: 0;
    }

    .logo {
      display: block;
      margin: 0 auto;
      width: 80%;
      animation: logo-fade-up $animation-duration ease $delayed-value;
      animation-fill-mode: forwards;
    }

    .actions {
      position: relative;
      @include useFlex(space-between, flex-start);
      margin: 7rem auto 0;
      width: 61rem;
      animation: actions-fade-up $animation-duration ease $delayed-value + .2s;
      animation-fill-mode: forwards;

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
</style>
