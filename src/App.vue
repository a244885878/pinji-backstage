<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import Home from './components/HomePage.vue'
export default {
  name: 'App',
  components:{
      "home":Home,
  }
}
</script>

<style>
  *{
    margin: 0 ;
    padding: 0;
    list-style: none;
  }
#app {
  margin: 20px auto;
  width: 1200px;
}
</style>
