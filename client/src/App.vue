<template>
  <div>
    <logger />
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import Logger from './components/debug/Logger';

const layoutDefault = 'default';
export default {
  components: {
    Logger,
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout ? this.$route.meta.layout : layoutDefault}-layout`;
    },
  },
};
</script>
