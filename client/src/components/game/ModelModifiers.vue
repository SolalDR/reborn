<template>
  <div class="model-modifiers">
    <div v-for="(modifier, index) in modifiers"
         :key="`model-infos-mounted-recur-modifier-${index}`">
      <svg class="arrow"
           :class="{'arrow--top': modifier.value > 0, 'arrow--bottom': modifier.value < 0}"
           width="9"
           height="15"
           viewBox="0 0 9 15">
        <path fill-rule="evenodd" d="M6 7v8H3V7H0l4.5-7L9 7H6z"/>
      </svg>

      <span class="icon">
        <icon :icon-name="modifier.name" :is-filled="true"/>
      </span>

      <span class="value">{{ modifier.value }}{{ isRecurent ? '/an' : '' }}</span>
    </div>
  </div>
</template>

<script>
import Icon from '../icons/Icon';

export default {
  name: 'model-modifier',
  components: {
    Icon,
  },
  props: {
    modifiers: Array,
    isRecurent: Boolean,
  },
};
</script>

<style lang="scss">
  $margin-value: 1.5rem;

  .model-modifiers {
    @include useFlex();

    & > div {
      @include useFlex();
      flex-wrap: nowrap;

      .arrow,
      .icon,
      .value {
        margin-right: .5rem;
      }

      .arrow {
        &--top {
          path {
            fill: getColor(gauges, high);
          }
        }

        &--bottom {
          transform: rotate(180deg);

          path {
            fill: getColor(gauges, low);
          }
        }
      }

      .icon {
        width: 1.6rem;
        height: 1.6rem;

        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
