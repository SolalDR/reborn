<template>
  <div @click="$emit('setCurrentModel', model.index)"
       @mouseover="isHovered = true"
       @mouseleave="isHovered = false"
       class="model"
       :class="{'model--current': isCurrent, 'model--hovered': isHovered}">
    {{ model.name }}

    <transition name="fade">
      <div v-if="(isCity && isCurrent) || (isCity && isHovered)"
           class="model__quantity">{{ quantity }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'model',
  props: {
    model: {
      type: Object,
      required: true,
    },
    money: Number,
    isCurrent: Boolean,
  },
  data() {
    return {
      isHovered: false,
    };
  },
  computed: {
    isCity() {
      return this.$game.player.role.name === 'city';
    },

    quantity() {
      if (this.$game.player.role.name === 'city') {
        const modelCost = this.model.states.creation.enterModifiers.find(modifier => modifier.name === 'money').value;
        return Math.floor(this.money / -modelCost);
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
  .model {
    $model-size: 5rem;

    cursor: pointer;
    opacity: .3;
    @include useFlex();
    position: relative;
    width: $model-size;
    height: $model-size;
    background-color: rgba(getColor(basics, white), .7);
    transition: all .3s ease;

    &--current,
    &--hovered {
      opacity: 1;
    }

    &__quantity {
      $model-quantity-size: 2rem;

      @include useFlex();
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(50%, 30%);
      width: $model-quantity-size;
      height: $model-quantity-size;
      background-color: getColor(basics, white);
      border: 1px solid getColor(basics, black);
      border-radius: 50%;
      @include fontSize(12);
      font-family: "DrukText-Medium";
    }
  }
</style>
