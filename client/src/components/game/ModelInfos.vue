<template>
  <transition name="fade-scale" appear>
    <div class="model-infos">
      <template v-if="modelDisplayed">
        <span>{{ modelDisplayed.displayName }}</span>

        <model-modifiers :modifiers="modelDisplayed.states.creation.enterModifiers.filter((modifier) => modifier.name !== 'money')"/>
        <model-modifiers :modifiers="modelDisplayed.states.mounted.recurModifiers"
                         :is-recurent="true"/>

        <span v-if="this.$game.player.role.name === 'city'" class="cost">
          <svg width="17" height="17" viewBox="0 0 17 17">
            <path fill="#000"
                  fill-rule="evenodd"
                  stroke="#000"
                  d="M16 10.82a7.113 7.113 0 0 0-6.375-7.023 1.18 1.18 0 0 0-.06-.686L12.25 1h-7.5l2.643 2.078a1.172 1.172 0 0 0-.072.725A7.113 7.113 0 0 0 1 10.87h.004v1.61H1v1.177A2.344 2.344 0 0 0 3.345 16h10.31A2.344 2.344 0 0 0 16 13.657V10.82z"/>
          </svg>

          {{ -modelDisplayed.states.creation.enterModifiers.find(modifier => modifier.name === 'money').value }}
        </span>
      </template>
    </div>
  </transition>
</template>

<script>
import ModelModifiers from './ModelModifiers';

export default {
  name: 'model-infos',
  components: {
    ModelModifiers,
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

<style lang="scss">
  $margin-value: 1.5rem;

  .model-infos {
    @include useFlex();
    padding: 0 1.5rem;
    height: 2.6rem;
    background-color: rgba(getColor(basics, white), .7);
    border: 2px solid getColor(basics, black);
    border-radius: 1.3rem;
    @include fontSize(12);
    font-family: "DrukText-Bold";

    .model-modifiers > div {
      margin-right: $margin-value;

      &:first-of-type {
        margin-left: $margin-value;
      }

      &:last-of-type {
        margin-right: 0;
      }
    }

    .cost {
      @include useFlex();
      flex-wrap: nowrap;
      margin-left: $margin-value;

      svg {
        margin-right: .5rem;
      }
    }
  }
</style>
