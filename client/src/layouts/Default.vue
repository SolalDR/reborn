<template>
  <div class="layout layout-default">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/rooms/create">Room Creation</router-link>
    </div>
    <slot/>
  </div>
</template>
