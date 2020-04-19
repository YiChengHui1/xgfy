<template>
  <div class="mask_information">
    <Layout>
      <common-header></common-header>
      <router-view />
    </Layout>
  </div>
</template>

<script>
import Header from '@/components/common/header'
export default {
  components: {
    'common-header': Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.mask_information {
  width: 100%;
}
</style>
