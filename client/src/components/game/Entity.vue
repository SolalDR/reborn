<template>
  <div class="entity" @click="setCurrentEntity">
    Entity
  </div>
</template>

<script>
export default {
  name: 'entity',
  props: {
    entity: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setCurrentEntity() {
      console.log('Set current Entity');
    },
  },
};
</script>

<style lang="scss" scoped>
  .entity {
    $size: 80px;

    overflow: hidden;
    @include useFlex();
    width: $size;
    height: $size;
    border-radius: 50%;
    background-color: rgba(getColor(basics, white), .7);
  }
</style>
