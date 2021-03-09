<template>
  <div id="app">
    <app-header></app-header>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import Header from "./components/Header"
export default {
  name: 'App',
  components: {
    "app-header": Header
  },
  data:function(){
    return {
      contacts:[]
    }
  }
}
</script>

<style scoped>
*{
  margin: 0;
  box-sizing: border-box;
  padding: 0;
}
</style>
