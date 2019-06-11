<template>
  <div>
    <logger v-if="logger"/>
    <GUI />
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Logger from './components/debug/Logger';
import GUI from './components/debug/Gui';
import config from '@/config';

const layoutDefault = 'default';
export default {
  data() {
    return {
      logger: config.debug.logger,
    };
  },
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
