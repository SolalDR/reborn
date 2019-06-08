<template>
  <div class="entry" :class="{'entry--error': entry.type === 'error'}">
    <p class="date">{{ this.date }}</p>

    <div class="content">
      <p class="content__title">{{ entry.eventName }}</p>
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

  computed: {
    date() {
      const date = new Date(this.entry.date);
      function pad(n) { return n < 10 ? `0${n}` : n; }
      return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
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
  margin-bottom: 5px;

  .date {
    font-size: 1em;
    margin-right: 15px;
  }

  .content {
    width: 100%;
    position: relative;

    &__title {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 1.2em;
    }

    > p {
      margin-bottom: 0;
    }

    &__datas {
      font-size: 12px;

      &__cta {
        cursor: pointer;
        font-size: 1em;
        position: absolute;
        top: 2px;
        right: 0;
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
