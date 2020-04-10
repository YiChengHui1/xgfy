<template>
  <div class="domestic_outbreak_main">
    <Content>
      <Card style="width:320px"></Card>
    </Content>

  </div>
</template>

<script>
import Header from '@/components/common/header'
import { getTotalDataOne } from '@/api/data.js'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    'common-header': Header
  },
  methods: {
    async getChinaData () {
      let res = await getTotalDataOne()
      console.log(res)
    }
  },
  created () {
    this.getChinaData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.domestic_outbreak_main {
  width: 100%;
}
</style>
