<template>
  <div class="outbreak-list">
    <Layout>
      <common-header></common-header>
      <router-view />
      <!-- <Footer>Footer</Footer> -->
    </Layout>
  </div>
</template>

<script>
import Header from '@/components/common/header'
export default {
  // data () {
  //   return {
  //     msg: 'Welcome to Your Vue.js App'
  //   }
  // },
  components: {
    'common-header': Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.outbreak-list {
  width: 100%;
}
</style>
