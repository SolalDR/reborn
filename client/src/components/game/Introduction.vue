<template>
  <div class="intro">
    <p class="intro__incarnate">Vous incarnez</p>

    <p class="intro__title title--wide">{{ title }}</p>
    <p v-for="(text, index) in texts"
       :key="`intro-text-${index}`"
       v-html="text"
       class="intro__text"></p>

    <div class="intro__footer footer">
      <div class="status">
        <button v-if="!pending" @click="start" class="cta--bordered">Démarrer la partie</button>
        <p v-if="pending">En attente de votre adversaire...</p>
      </div>

      <div class="tips">
        <p v-html="currentTip" class="tip"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'introduction',
  data() {
    return {
      pending: false,
      tips: [
        'Surveillez vos jauges,<br> la partie s’arrête si une jauge atteint un niveau critique.',
      ],
    };
  },

  computed: {
    title() {
      return this.$game.player.role.name === 'city'
        ? 'La Civilisation'
        : 'La Nature';
    },

    texts() {
      return this.$game.player.role.name === 'city'
        ? [
          'Vous êtes à la tête des survivants.<br> Tous ont faim et besoin d’un toit. Tentez de bâtir une nouvelle civilisation viable.',
          'Pour cela, il va falloir prélever des ressources à la nature.<br> Mais attention, celles-ci sont disponibles en nombre limité et il ne faudrait pas reproduire les erreurs du passé.',
        ]
        : [
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.<br> Impedit autem, tenetur, suscipit est veniam sit a, magnam libero explicabo commodi assumenda quam consequuntur!',
          'Perferendis aspernatur illum velit repellat perspiciatis error.',
        ];
    },

    currentTip() {
      return this.tips[0];
    },
  },

  methods: {
    start() {
      this.pending = true;
      this.$emit('start');
    },
  },
};
</script>

<style lang="scss">
  .intro {
    margin-top: -20vh;

    &__incarnate {
      margin-bottom: $space-m;
      @include fontSize(36);
      text-transform: uppercase;
    }

    &__title {
      margin-bottom: $space-xl;
      @include fontSize(48);
    }

    &__text {
      margin: 0 auto $space-l;
      max-width: 60rem;
      @include fontSize(18);

    }

    &__footer {
      .status {
        margin-bottom: $space-xxl;

        p {
          padding: 1.2rem 0;
          @include fontSize(20);
        }
      }

      .tips {
        .tip {}
      }
    }
  }
</style>
