<template>
  <div @click="$emit('setCurrentSkill', skill.index)"
       @mouseover="isHovered = true"
       @mouseleave="isHovered = false"
       class="skill"
       :class="{'skill--current': isCurrent, 'skill--hovered': isHovered}">
    <img :src="icons[skill.slug]" :alt="skill.name">

    <transition name="fade">
      <div v-if="(isCity && isCurrent) || (isCity && isHovered)"
           class="skill__quantity">{{ quantity }}</div>
    </transition>
  </div>
</template>

<script>
import icons from '../../assets/icons/game/nature/inventory/skills';

export default {
  name: 'skill',
  props: {
    skill: {
      type: Object,
      required: true,
    },
    money: Number,
    isCurrent: Boolean,
  },
  data() {
    return {
      icons: icons,
      isHovered: false,
    };
  },
  computed: {
    isCity() {
      return this.$game.player.role.name === 'city';
    },
    quantity() {
      if (this.$game.player.role.name === 'city') {
        const skillCost = this.skill.states.creation.enterModifiers.find(modifier => modifier.name === 'money').value;
        return Math.floor(this.money / -skillCost);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .skill {
    $skill-size: 5rem;

    cursor: pointer;
    opacity: .3;
    @include useFlex();
    position: relative;
    width: $skill-size;
    height: $skill-size;
    transition: all .3s ease;

    &--current,
    &--hovered {
      opacity: 1;
    }

    &__quantity {
      $skill-quantity-size: 2rem;

      @include useFlex();
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translate(50%, 30%);
      width: $skill-quantity-size;
      height: $skill-quantity-size;
      background-color: getColor(basics, white);
      border: 1px solid getColor(basics, black);
      border-radius: 50%;
      @include fontSize(12);
      font-family: "DrukText-Medium";
    }
  }
</style>
