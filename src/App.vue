<template>
  <header class="app__header">
    <nav class="app__navbar">
      <h1 class="app__navbar__title">Daily Covid-19 Status</h1>
      <p>v1.0.0</p>
    </nav>
  </header>
  <router-view></router-view>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    let navMenu = ref(["Home", "Search"]);

    return {
      navMenu,
    };
  },
};
</script>

<style>
@import url("./assets/reset.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}
.app__header {
  padding: 16px 8px;
  background: #005ecb;
}
.app__navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.app__navbar__title {
  font-size: 1.5rem;
}
</style>
