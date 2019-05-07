<template>
  <div>
    <div class="leaderboard__header">
      <p>Meilleures survies</p>
    </div>

    <div class="leaderboard__body">
      <ul>
        <li></li>
        <li>Civilisation</li>
        <li>Nature</li>
      </ul>

      <ul>
        <li v-for="(doc, index) in collection" :key="`leaderboard-doc-${index}`">
          {{ doc.data().score }} {{ doc.data().cityName }} {{ doc.data().natureName }}
        </li>
      </ul>
    </div>

    <div class="leaderboard__footer">
      <p @click="$emit('updateStatus', 'explanations')" class="cta--bordered">Retour</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leaderboard',
  props: ['collection'],
};
</script>

<style lang='scss'>
  .leaderboard {}
</style>
