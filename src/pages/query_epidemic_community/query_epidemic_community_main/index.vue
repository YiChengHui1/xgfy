<template>
  <div class="query_epidemic_community_main">
    <Content class="content">
      <baidu :items="data"></baidu>
    </Content>
  </div>
</template>

<script>
import baidu from '@/components/baidu'
import axios from 'axios'
import {mapGetters} from 'vuex'
// eslint-disable-next-line standard/object-curly-even-spacing
import { provinceAndCityDataPlus, CodeToText } from 'element-china-area-data'
export default {
  components: { baidu },
  data () {
    return {
      options: provinceAndCityDataPlus,
      selectedOptions: ['340000', '340100'], // 默认是安徽省合肥市
      data: []
    }
  },
  computed: {
    ...mapGetters(['mapProvinceCityInfo'])
  },
  methods: {
    handleChange (value) {
      if (value[1] === '') {
        let addr = ''
        addr = CodeToText[value[0]]
        let param = { province: addr }
        this.getData(param)
      } else {
        let param = {
          province: CodeToText[value[0]],
          city: CodeToText[value[1]]
        }

        this.getData(param)
      }
    },
    getData (p) {
      axios
        .get('https://lab.ahusmart.com/nCoV/api/detail', {
          params: p
        })
        .then(response => {
          this.data = response.data.results
          // console.log(response)
        })
    }
  },
  created () {
    document.title = '全国新冠病例小区分布'
    let p = { province: '安徽省', city: '合肥市' }
    this.getData(p)
  },
  watch: {
    mapProvinceCityInfo: function (newValue, oldValue) {
      // console.log(newValue)
      this.getData(newValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.query_epidemic_community_main {
  width: 100%;
  .content {
    width: 100%;
    height: 35rem;
  }
  // .bg-info {
  //   background-color: #409eff !important;
  // }
}
</style>
