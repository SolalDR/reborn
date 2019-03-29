<template>
  <div>
    <div class="grid" :style="`--width: ${size[0]}; --height: ${size[1]};`">
      <div
        class="grid__cell"
        @click="onClick(i)"
        v-for='i in (size[0]*size[1])'
        :style="`--color: ${cells[i] ? cells[i].color : 'white'}`"
        :key='i'/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridComponent',
  props: {
    size: {
      type: Array,
      default: () => [32, 32],
    },
    cells: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log(this.cells);
  },
  computed: {
    height() {
      return this.$el ? this.$el.offsetWidth : 0;
    },
  },
  methods: {
    onClick(i) {
      if (this.cells[i]) {
        console.log(this.cells[i]);
      }


      this.$emit('clickCell', {
        position: [i % this.size[0], Math.floor(i / this.size[1])],
      });
    },
  },
};
</script>

<style lang="scss" scope>
.grid {
  display: grid;
  grid-template-columns: repeat(var(--width), 32px);
  grid-template-rows: repeat(var(--height), 32px);
  width: 100%;
  &__cell {
    background-color: var(--color);
    border: 1px solid #CCC;
    transition: {
      duration: .1s;
      property: background-color;
    }
    &:hover {
      background-color: #EEE;
    }
  }
}
</style>
