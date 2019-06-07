<template>
  <transition name="fade-scale" appear>
    <div class="model-infos">
      <template v-if="modelDisplayed">
        <span>{{ modelDisplayed.displayName }}</span>
        <span v-for="(modifier, index) in modelDisplayed.states.mounted.recurModifiers"
              :key="`model-infos-modifier-${index}`">
          {{ modifier.value > 0 ? '+' : '-' }} {{ modifier.name }} {{ modifier.value }}/an
        </span>
        <span v-if="this.$game.player.role.name === 'city'">X {{ -modelDisplayed.states.creation.enterModifiers.find(modifier => modifier.name === 'money').value }}</span>
      </template>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'model-infos',
  props: ['currentModel', 'hoveredModel'],
  data() {
    return {
      modelDisplayed: this.currentModel,
    };
  },
  watch: {
    hoveredModel() {
      this.modelDisplayed = this.hoveredModel ? this.hoveredModel : this.currentModel;
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

    span {
      margin-right: 1.5rem;
      @include fontSize(12);
      font-family: "DrukText-Bold";

      &:last-of-type {
        margin-right: 0;
      }
    }
  }
</style>
