<template>
  <div id="app">
    <h1>Касса кинотеатра</h1>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/reset.css'
import '@/assets/patches.styl'

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
