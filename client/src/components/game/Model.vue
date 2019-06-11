<template>
  <div @click="$emit('setCurrentModel', model)"
       @mouseover="mouseOver"
       @mouseleave="mouseLeave"
       class="model"
       :class="{'model--current': isCurrent || isHovered}">
    <img :src="modelIcons[model.slug]" :alt="model.name">

    <transition name="fade">
      <div v-if="isCity"
           class="model__quantity"
           :class="{'model__quantity--disabled': quantity === 0}">
        {{ quantity }}
      </div>
    </transition>
  </div>
</template>

<script>
import cityIcons from '../../assets/icons/game/city/inventory/models';
import natureIcons from '../../assets/icons/game/nature/inventory/models';

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
      if (this.isCity) {
        const modelCost = this.model.states.creation.enterModifiers.find(modifier => modifier.name === 'money').value;
        return Math.floor(this.money / -modelCost);
      }
      return '';
    },
    modelIcons() {
      return this.isCity ? cityIcons : natureIcons;
    },
  },
  methods: {
    mouseOver() {
      this.$emit('setHoveredModel', this.model);
      this.isHovered = true;
    },
    mouseLeave() {
      this.$emit('setHoveredModel', '');
      this.isHovered = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .model {
    cursor: pointer;
    @include useFlex();
    position: relative;

    img {
      $img-size: 5rem;

      opacity: .3;
      transition: opacity .3s ease;

      width: $img-size;
      height: $img-size;
    }

    &--current {
      img {
        opacity: 1;
      }
    }

    &__quantity {
      $model-quantity-size: 2rem;

      @include useFlex();
      position: absolute;
      bottom: 0;
      right: 2rem;
      transform: translate(50%, 30%);
      width: $model-quantity-size;
      height: $model-quantity-size;
      background-color: getColor(basics, white);
      border: 1px solid getColor(basics, black);
      border-radius: 50%;
      @include fontSize(12);
      font-family: "DrukText-Medium";

      &--disabled {
        background-color: getColor(gauges, low);
      }
    }
  }
</style>
