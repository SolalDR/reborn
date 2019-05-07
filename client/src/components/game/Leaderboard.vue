<template>
  <div>
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
</template>

<script>
export default {
  name: 'leaderboard',
  props: ['collection'],
};
</script>
