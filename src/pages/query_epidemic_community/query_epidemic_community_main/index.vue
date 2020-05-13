<template>
  <div class="query_epidemic_community_main">
    <Content class="content">
      <baidu :items="data"></baidu>
    </Content>
  </div>
</template>

<script>
import baidu from '@/components/baidu'
// import axios from 'axios'
import {mapGetters} from 'vuex'
// eslint-disable-next-line standard/object-curly-even-spacing
import { provinceAndCityDataPlus } from 'element-china-area-data'
import { getVillage2 } from '@/api/data.js'
export default {
  components: { baidu },
  data () {
    return {
      options: provinceAndCityDataPlus,
      selectedOptions: ['340000', '340100'], // 默认是北京
      data: []
    }
  },
  computed: {
    ...mapGetters(['mapProvinceCityInfo'])
  },
  methods: {
    async getVillage1Fun (params) {
      let res = await getVillage2(params)
      if (res.status === 200) {
        let temp = res.data.data
        let dataArr = []
        temp.forEach((item, index) => {
          if (item.district_name === '上街区中') {
            item.district_name = '上街区'
          }
          let obj = {
            country: '中国',
            id: index,
            province: item.province_name,
            city: item.city_name,
            detail: item.posi_address,
            county: item.district_name,
            position: item.point.reverse(),
            updateTime: item.update_time,
            show: false
          }
          dataArr.push(obj)
        })
        this.data = dataArr
      }
    },
    init () {
      document.title = '全国新冠病例小区分布'
      let params = {
        cityName: '北京市'
      }
      this.getVillage1Fun(params)
    }

  },
  created () {
    this.init()
  },
  watch: {
    mapProvinceCityInfo: function (newValue, oldValue) {
      this.getVillage1Fun(newValue)
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
