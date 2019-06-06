<template>
  <div class="entry" :class="{'entry--error': entry.type === 'error'}">
    <p class="date">{{ entry.date }}</p>

    <div class="content">
      <p>{{ entry.eventName }}</p>
      <div class="content__datas">
        <p class="content__datas__cta" @click="showDatas = !showDatas">
          {{ showDatas ? 'Masquer ' : 'Afficher ' }}les données
        </p>

        <pre v-if="showDatas">{{ entry.datas }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntryComponent',

  props: {
    entry: {
      type: Object,
    },
  },

  data() {
    return {
      showDatas: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.entry {
  display: flex;

  .date {
    // border-right: 1px solid black;
  }

  .content {
    width: 100%;

    > p {
      margin-bottom: 0;
    }

    &__datas {
      font-size: 12px;

      &__cta {
        cursor: pointer;
        margin-top: 5px;
      }
    }
  }

  &--error {
    color: red;

    .content {
      font-weight: bold;
    }
  }
}
</style>
