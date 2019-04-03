<template>
  <div class="log" :class="{'log--error': log.type === 'error'}">
    <div class="date">
      <p>{{ log.date }}</p>
    </div>

    <div class="content">
      <p>{{ log.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogComponent',

  props: {
    log: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.log {
  display: flex;

  &--error {
    color: red;

    .content {
      font-weight: bold;
    }
  }

  .date {
    width: 210px;
  }

  .content {
    width: 100%;
  }
}
</style>

