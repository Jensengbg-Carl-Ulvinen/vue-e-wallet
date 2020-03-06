<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

body {
      background: black;
    }

#app {
  background: black;
  font-family: "Montserrat", sans-serif;
  text-align: center;
  color: #ffffff;
  h1, h2, h3, h4, h5 {
    font-weight: bold;
    color: #ffffff;
    }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #ffffff;

    &.router-link-exact-active {
      color: #cacaca;
    }
  }
}
</style>
