<template>
  <div class="metric">
    <div class="metric__content">
        <p>{{ metric.name }}</p>
        <p>
          <span class="metric__value">
            {{ Math.floor(metric.value*1000)/1000 }}
          </span>
          <span
            :class="`metric__value--${metric.recurentOperation > 0 ? 'green' : 'red'}`"
            class="metric__value" >
            <md-icon>sync</md-icon>
            {{ Math.floor(metric.recurentOperation*1000)/1000 }}
          </span>
        </p>
    </div>
    <md-progress-bar md-mode="buffer" :md-buffer="100" :md-value="metric.value"></md-progress-bar>
  </div>
</template>


<script>
export default {
  props: {
    metric: {
      type: Object,
      default: () => ({
        value: 0,
        name: '',
        slug: '',
        recurentOperation: 0,
      }),
    },
  },
};
</script>

<style lang="scss">
.metric {
  &__content {
    display: flex;
    justify-content: space-between;
  }

  &__value {
    display: inline-block;
    min-width: 60px;
    .md-icon {
      height: 20px;
      color: inherit;
    }
    &--green {
      color: green;
    }
    &--red {
      color: red;
    }
  }
}
</style>
