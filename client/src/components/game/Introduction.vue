<template>
  <div class="intro">
    <p class="intro__incarnate">Vous incarnez</p>

    <p class="intro__title">{{ title }}</p>
    <p v-for="(text, index) in texts"
       :key="`intro-text-${index}`"
       v-html="text"
       class="intro__text"></p>

    <button v-if="!pending" @click="start" class="cta--bordered">Démarrer la partie</button>

    <p v-if="pending">En attente de votre adversaire...</p>

    <div class="intro__tips">
      <p v-html="currentTip" class="intro__tip"></p>
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
        'Surveillez vos jauges,<br> la partie s’arrête si une jauge atteint un niveau critique.'
      ]
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
            'Perferendis aspernatur illum velit repellat perspiciatis error.'
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
    &__incarnate {
      @include fontSize(36);
    }

    &__title {
      @include fontSize(48);
    }

    &__text {
      @include fontSize(18);
    }

    &__tips {
      .intro__tip {}
    }
  }
</style>
