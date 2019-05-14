<template>
  <div class="leaderboard">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="scrollTable">
      <thead class="fixedHeader">
        <tr>
          <th></th>
          <th>Civilisation</th>
          <th>Nature</th>
        </tr>
      </thead>
      <tbody class="scrollContent">
        <tr v-for="(doc, index) in collection" :key="`leaderboard-doc-${index}`">
          <td>{{ doc.data().score }}</td>
          <td>{{ doc.data().cityName }}</td>
          <td>{{ doc.data().natureName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'leaderboard',
  props: ['collection'],
};
</script>

<style lang="scss">
  .leaderboard {
    clear: both;
    overflow: auto;
    margin-top: -10vh;
    width: 87rem;
    text-align: left;

    table {
      float: left;

      th,
      td {
        width: calc(87rem / 3);
        height: 3.8rem;
        font-family: "DrukText-Bold";
      }

      th {
        text-transform: uppercase;
        @include fontSize(36);
      }

      td {
        @include fontSize(18);
      }
    }

    .fixedHeader {
      display: table;
      margin-bottom: $space-l;
      // Scrollbar size
      padding-right: 2.5rem;
      width: 100%;

      tr {
        position: relative;
      }
    }

    .scrollContent {
      overflow-y: scroll;
      display: block;
      width: 100%;
      max-height: 50vh;
    }
  }
</style>
