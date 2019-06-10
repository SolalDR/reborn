<template>
  <div class="layout default-layout">
    <!--<div id="nav" class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/rooms/create">Room Creation</router-link>
    </div>-->
    <slot/>
  </div>
</template>

<style lang="scss">
.default-layout {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
