<template>
  <div id="app">
    <AboutUsModal></AboutUsModal>
    <router-view />
  </div>
</template>

<script>
import AboutUsModal from '@/components/aboutus'
export default {
  name: 'App',
  components: {
    AboutUsModal
  }
}
</script>

<style>
#app {
  width: 100vw;
  /* height: 100vh; */
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
