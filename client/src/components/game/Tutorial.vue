<template>
  <div class="tutorial__modal">
    <div class="panel">
      <p>Vous incarnez</p>

      <!-- TODO: Binding with current player role -->
      <p>La civilisation</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit autem, tenetur, suscipit est veniam sit a, magnam libero explicabo commodi assumenda quam consequuntur! Perferendis aspernatur illum velit repellat perspiciatis error.</p>

      <button>
        Voir le tutoriel
      </button>

      <button @click="start">
        Commencer
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tutorial',

  methods: {
    start() {
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
