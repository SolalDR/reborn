<template>
  <div>
    <div class="grid" :style="`--width: ${size[0]}; --height: ${size[1]};`">
      <div
        class="grid__cell"
        @click="onClick(i)"
        v-for='i in (size[0]*size[1])'
        :class="{
          'grid__cell-focus': cells[i] && cells[i].model === selectedModel,
          'grid__cell-focus': cells[i] && cells[i].states && cells[i].states.indexOf(selectedState) >= 0,
          'grid__cell-focus': cells[i] && cells[i].states && cells[i].states.indexOf(selectedState) >= 0,
        }"
        :style="`--color: ${cells[i] ? cells[i].color : 'white'}; --alpha: ${computeOpacity(cells[i])};`"
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
    selectedState: {
      type: String,
      default: '',
    },
    selectedRole: {
      type: String,
      default: '',
    },
    selectedModel: {
      type: String,
      default: '',
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
    computeOpacity(cell) {
      if (!cell || !cell.states) return 0.1;
      if (cell.states.indexOf('creation') >= 0
      || cell.states.indexOf('destruction') >= 0) {
        return 0.5;
      }

      if (cell.states.indexOf('mounted') >= 0) {
        return 1;
      }

      return 0.1;
    },
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
    opacity: var(--alpha);
    border: 1px solid #000;
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
