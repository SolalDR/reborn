<template>
  <div class="webgl-component" style="--x: 0px; --y: 0px;">
    <div class="webgl-component__body">
      <slot />
    </div>
  </div>
</template>

<script>
import uuid from '@/utils/uuid';

export default {
  data() {
    return {
      uuid: uuid(),
    };
  },

  props: {
    position: {
      type: THREE.Vector3,
      default: () => new THREE.Vector3(),
    },
  },

  watch: {
    position(next) {
      this.$webgl.worldScreen.set(this.uuid, next);
    },
  },

  mounted() {
    this.$webgl.worldScreen.add(this.uuid, this.position, (x, y) => {
      this.$el.style.setProperty('--x', `${x}px`);
      this.$el.style.setProperty('--y', `${y}px`);
    });
  },

  beforeDestroy() {
    this.$webgl.worldScreen.remove(this.uuid);
  },
};
</script>

<style lang="scss">
.webgl-component {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(var(--x)) translateY(var(--y)) translateZ(0);

  &__body {
    transform: translateX(-50%) translateY(-50%) translateZ(0);
  }
}
</style>
