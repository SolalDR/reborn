<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>

html {
  height: 100%;
  width: 100%;
}

body {
  min-height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

#app {
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.md-app {
  min-height: 100vh;
}
</style>
