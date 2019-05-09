<template>
  <div>
    <logger />
    <GUI />
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import Logger from './components/debug/Logger';
import GUI from './components/debug/Gui';

const layoutDefault = 'default';
export default {
  components: {
    Logger,
    GUI,
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout ? this.$route.meta.layout : layoutDefault}-layout`;
    },
  },
};
</script>
