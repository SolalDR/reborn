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

.default-layout * {
  &::selection {
    background-color: getColor(mains, primary) !important;
  }

  &::-webkit-scrollbar-track {
    background-color: getColor(basics, white);
    border: 1px solid getColor(basics, black);
    border-radius: 1.25rem;
  }

  &::-webkit-scrollbar {
    width: 2.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: getColor(basics, black);
    border-radius: 1.25rem;
  }
}

.header,
.footer {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.header {
  top: 7rem;
}

.footer {
  bottom: 6rem;
}

</style>
