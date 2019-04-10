<template>
  <div>
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
const layoutDefault = 'default';
export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout ? this.$route.meta.layout : layoutDefault}-layout`;
    },
  },
};
</script>
