<template>
  <div class="mask_main">
    <Content class="content">
      <Card class="card">
        <div class="top-content">
          <div
          v-if="province.length!==0"
          :class="['province-name',{' current-choose':province.isLoc}]"
            v-for="province in maskInfo"
            :key="province.value"
            @click="changeProvince(province)"
          >{{
          province.province}}</div>
        </div>
        <div class="middle-content">
          <p>{{`省份：${currentProvince.province}`}}</p>
          <div
          class="city-info"
            v-for="(city,index) in currentProvince.list"
            :key="index"
          >
            <p>{{`城市：${city.city}`}}</p>
            <p v-if="city.url!==''"><a :href="city.url">{{`点击进入${city.city}口罩预约购买指南`}}</a></p>
            <div
            class="district-info"
              v-if="city.list!==[]"
              v-for="district in city.list"
              :key="district.value"
            >
              <p>{{`地区：${district.district}`}}</p>
              <p v-if="district.url!==''"><a :href="district.url">{{`点击进入${district.district}口罩预约购买指南`}}</a></p>
            </div>
          </div>

          <!-- <p>{{`城市：${currentProvince.list[0].city}`}}</p> -->
        </div>
      </Card>
    </Content>
  </div>
</template>

<script>
import Header from '@/components/common/header'
import { getGauzeMask } from '@/api/data.js'
export default {
  data () {
    return {
      maskInfo: [],
      currentProvince: {}
    }
  },
  components: {
    'common-header': Header
  },
  methods: {
    // 切换省份口罩信息
    changeProvince (province) {
      this.maskInfo.forEach(item => {
        item.isLoc = false
      })
      province.isLoc = true
      this.currentProvince = province
    },
    // 获取所有口罩信息
    async getGauzeMaskFun () {
      let res = await getGauzeMask()
      if (res.status === 200) {
        this.maskInfo = res.data.data
        this.maskInfo.forEach(item => {
          if (item.isLoc) {
            this.currentProvince = item
          }
        })
        console.log(res.data.data, this.currentProvince)
      }
      // console.log(res)
    }
  },
  created () {
    this.getGauzeMaskFun()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.mask_main {
  width: 100vw;
  .content {
    width: 100vw;
    height: 35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .card {
      width: 90vw;
      height: 30rem;
      .top-content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .province-name {
          padding: 0.5rem 1rem;
          border-radius: 0.3rem;
          margin-right: 1rem;
          margin-bottom: 0.5rem;
          cursor: pointer;
          background-color: #fff;
          border: 1px solid skyblue;
          color: #000;
        }
        .current-choose {
          background-color: skyblue;
          color: #fff;
          border: 1px solid #fff;
        }
        .province-name:active {
          transform: translateY(1px);
        }
      }
      .middle-content{
        width: 100%;
        height: 22rem;
        overflow-y: auto;
        .city-info{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          p:nth-child(1){
            margin: 0 1rem 0 0.5rem;
          }
          .district-info{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            p:nth-child(1){
              margin: 0 1rem 0 1rem;
            }

          }
        }

      }
    }
  }
}
</style>
