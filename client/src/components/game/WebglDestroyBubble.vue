<template>
  <div class="destroy-bubble" :class="{
      'destroy-bubble--hovered': hovered
    }">
    <span class="destroy-bubble__value">
      {{ value }}
    </span>
    <button class="destroy-bubble__button"
      @click="onClick"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false">
      <img src="@/assets/icons/game/common/trash.svg" alt="">
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hovered: false,
      value: null,
    };
  },

  mounted() {
    const model = this.$game.entityModels.get(this.model);
    if (model.states.destruction && model.states.destruction.enterModifiers) {
      model.states.destruction.enterModifiers.forEach((modifier) => {
        if (modifier.name === 'money') {
          this.value = modifier.value;
        }
      });
    }
  },

  props: {
    model: {
      type: String,
    },
  },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>


<style lang="scss">
.destroy-bubble {
  background-color: getColor(basics, black);
  border-radius: 3rem;
  height: 4.5rem;
  min-width: 4.5rem;
  display: flex;
  position: relative;
  --duration: 0.2s !important;
  padding-right: 4.5rem;
  transform: translateX(-50%);
  transition: {
    duration: .3s;
    property: width, max-width;
    timing-function: ease-in-out;
  }
  max-width: 15rem;
  overflow: hidden;

  // &--hovered {
  //   max-width: 4.5rem;
  //   overflow: hide;
  // }

  &__value {
    color: getColor(basics, white);
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px 0 15px;
    font-family: "DrukText-Bold";
    font-size: 2.5rem;
  }

  &__button {
    height: 4.5rem;
    width: 4.5rem;
    border: 2px solid getColor(basics, black);
    background-color: white;
    border-radius: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
