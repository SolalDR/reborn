<template>
  <div class="tutorial__modal">
    <div class="panel">
      <p>Vous incarnez</p>

      <p>{{ title }}</p>
      <p>{{ description }}</p>

      <div v-if="!pending">
        <button>Voir le tutoriel</button>
        <button @click="start">Commencer</button>
      </div>

      <div v-if="pending">
        <p>En attente de votre adversaire</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tutorial',

  data() {
    return {
      pending: false,
    };
  },

  computed: {
    title() {
      return this.$game.player.role.name === 'city'
        ? 'La Civilisation'
        : 'La Nature';
    },

    description() {
      return this.$game.player.role.name === 'city'
        ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit autem, tenetur, suscipit est veniam sit a, magnam libero explicabo commodi assumenda quam consequuntur! Perferendis aspernatur illum velit repellat perspiciatis error.'
        : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit autem, tenetur, suscipit est veniam sit a, magnam libero explicabo commodi assumenda quam consequuntur! Perferendis aspernatur illum velit repellat perspiciatis error.';
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

<style lang="scss" scoped>
  .tutorial__modal,
  .overlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .tutorial__modal {
    position: fixed;
    @include useFlex();

    .overlay {
      position: absolute;
      background-color: rgba(getColor(basics, black), .2);
    }

    .panel {
      $padding: 20px;

      z-index: 1;
      position: relative;
      padding: $padding;
      width: 70vw;
      border-radius: 14px;
      text-align: center;
      background-color: getColor(basics, white);

      &__cross {
        position: absolute;
        top: $padding - 10px;
        right: $padding - 10px;
        padding: 20px;
      }
    }
  }
</style>
