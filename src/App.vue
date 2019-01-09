<template>
  <div id="app">
    <!--<login></login>-->
    <!--<home></home>-->
    <router-view name="One"></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue'
//import Home from './components/HomePage.vue'
export default {
  name: 'App',
  components:{
//      "home":Home,
      "login":Login,
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
  /*margin: 20px auto;*/
  /*width: 1200px;*/
}
</style>
