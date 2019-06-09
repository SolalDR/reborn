<template>
  <transition name="fade-scale" appear>
    <div class="model-infos">
      <template v-if="modelDisplayed">
        <span>{{ modelDisplayed.displayName }}</span>

        <div v-for="(modifier, index) in modelDisplayed.states.mounted.recurModifiers"
              :key="`model-infos-modifier-${index}`">
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
          <span>{{ modifier.value }}/an</span>
        </div>

        <span v-if="this.$game.player.role.name === 'city'" class="cost">
          X {{ -modelDisplayed.states.creation.enterModifiers.find(modifier => modifier.name === 'money').value }}
        </span>
      </template>
    </div>
  </transition>
</template>

<script>
import Icon from '../icons/Icon';

export default {
  name: 'model-infos',
  components: {
    Icon,
  },
  props: ['currentModel', 'hoveredModel'],
  data() {
    return {
      modelDisplayed: null,
    };
  },
  mounted() {
    this.modelDisplayed = this.currentModel;
  },
  watch: {
    currentModel(model) {
      this.modelDisplayed = model;
    },
    hoveredModel(hoveredModel) {
      this.modelDisplayed = hoveredModel || this.currentModel;
    },
  },
};
</script>

<style lang="scss" scoped>
  .model-infos {
    @include useFlex();
    padding: 0 1.5rem;
    height: 2.6rem;
    background-color: rgba(getColor(basics, white), .7);
    border: 2px solid getColor(basics, black);
    border-radius: 1.3rem;
    @include fontSize(12);
    font-family: "DrukText-Bold";

    $margin-value: 1.5rem;
    & > div {
      @include useFlex();
      margin-right: $margin-value;

      &:first-of-type {
        margin-left: $margin-value;
      }

      &:last-of-type {
        margin-right: 0;
      }

      & > * {
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

    .cost {
      margin-left: $margin-value;
    }
  }
</style>
