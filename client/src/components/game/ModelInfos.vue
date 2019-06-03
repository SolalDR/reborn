<template>
  <div class="model-infos">
    <template v-if="model">
      <span>{{ model.displayName }}</span>
      <span v-for="(modifier, index) in model.states.mounted.recurModifiers"
            :key="`model-infos-modifier-${index}`">
        {{ modifier.value > 0 ? '+' : '-' }} {{ modifier.name }} {{ modifier.value }}/an
      </span>
      <span v-if="this.$game.player.role.name === 'city'">X {{ -model.states.creation.enterModifiers.find(modifier => modifier.name === 'money').value }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'model-infos',
  props: ['model'],
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
