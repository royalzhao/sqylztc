<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "../static/css/style.css";
@import url("//at.alicdn.com/t/font_558321_r78o7mpnustqehfr.css");
@import url("../node_modules/social-share.js/dist/css/share.min.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #5C5C5C;
}
</style>
