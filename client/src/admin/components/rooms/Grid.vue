<template>
  <div>
    <div class="grid" :style="`--width: ${size[0]}; --height: ${size[1]};`">
      <div
        class="grid__cell"
        @click="onClick(i)"
        v-for='i in (size[0]*size[1])'
        :class="{
          'grid__cell--hidden': !modelVisible(cells[i]),
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
    filtersModel: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {

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
      this.$emit('clickCell', {
        position: [i % this.size[0], Math.floor(i / this.size[1])],
        rank: i,
        entity: this.cells[i],
      });
    },

    modelVisible(cell) {
      if (this.filtersModel.length === 0 || !cell) return true;
      if (!cell) return false;
      if (this.filtersModel.indexOf(cell.model) < 0) {
        return false;
      }
      return true;
    },

    stateVisible(cell) {
      if (this.filtersState.length === 0 || !cell) return true;
      if (!cell) return false;

      let match = false;
      cell.states.forEach((state) => {
        if (this.filtersState.indexOf(state) < 0) {
          match = true;
        }
      });

      return match;
    },

    roleVisible(cell) {
      if (this.filtersModel.length === 0 || !cell) return true;
      if (!cell) return false;
      if (this.filtersModel.indexOf(cell.model) < 0) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scope>
.grid {
  display: grid;
  grid-template-columns: repeat(var(--width), 2vw);
  grid-template-rows: repeat(var(--height), 2vw);
  width: 100%;
  &__cell {
    background-color: var(--color);
    opacity: var(--alpha);
    border: 1px solid #000;
    &:hover {
      background-color: #EEE;
    }

    &--hidden {
      background-color: white;
      opacity: 0.1;
    }
  }
}
</style>
