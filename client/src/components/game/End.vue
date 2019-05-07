<template>
  <!-- TODO: Transfert this component in Game.vue -->
  <overlay>
    <div class='leaderboard'>
      <transition name="fade" mode="out-in">
        <explanations v-if="status === 'explanations'" @updateStatus="updateStatus"/>

        <saving v-if="status === 'saving'" @updateStatus="updateStatus"/>
      </transition>
    </div>
  </overlay>
</template>

<script>
import Overlay from '../global/Overlay';
import Explanations from './Explanations';
import Saving from './Saving';

export default {
  name: 'end',
  components: {
    Overlay,
    Explanations,
    Saving,
  },
  data() {
    return {
      status: 'explanations', // explanations => saving => leaderboard
    };
  },
  methods: {
    updateStatus(status) {
      this.status = status;
    },
  },
};
</script>

<style lang='scss'>
  .leaderboard {}
</style>
