<template>
  <div class="mask_main">
    <Content class="content">
      <Card
        class="card"
        v-if="maskInfo!=[]"
      >
        <div class="top-content">
          <div class="top-content-left">
            省份
          </div>
          <div class="top-content-right">
            <span
              v-for="provinceInfo in maskInfo"
              :key="provinceInfo.value"
              :class="['province-name',{' current-choose':provinceInfo.isLoc}]"
              @click="changeProvince(provinceInfo)"
            >{{provinceInfo.province}}</span>
          </div>
        </div>
        <div class="middle-content">
          <p>开放预约购买城市及地区</p>
          <div class="main-content">
            <div
              class="city-info"
              v-for="(city,index) in currentProvince.list"
              :key="index"
            >
              <div class="item1">
                <img
                  class="city-img"
                  src="@/assets/imgs/fangzi.png"
                  alt=""
                >
                <span class="city-name">{{city.city}}</span>
                <span
                  class="mask-url"
                  v-if="city.url!==''"
                ><a
                    class="a-mask"
                    :href="city.url"
                  >{{`点击进入${city.city}口罩预约购买指南`}}</a></span>
              </div>
              <div
                class="item2"
                v-if="city.list!==[]"
              >
                <div
                  class="district-info"
                  v-for="district in city.list"
                  :key="district.value"
                >
                  <span class="city-name2">{{district.district}}</span>
                  <span
                    class="city-url"
                    v-if="district.url!==''"
                  ><a :href="district.url">{{`点击进入${district.district}口罩预约购买指南`}}</a></span>
                  <span
                    v-else
                    class="city-url"
                  >暂无相关指南</span>
                </div>
              </div>
            </div>
          </div>
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
      }
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
      height: 32rem;
      color: #000;
      .top-content {
        width: 100%;
        display: flex;
        font-size: 0.95rem;
        // color: #000;
        .top-content-left {
          width: 5%;
        }
        .top-content-right {
          width: 95%;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #d6d6d6;
          .province-name {
            display: inline-block;
            margin-right: 1.5rem;
            cursor: pointer;
          }
          .current-choose {
            color: #ff8b3d;
          }
        }
      }
      .middle-content {
        width: 100%;
        margin: 0.5rem 0 0 0;
        font-size: 0.9rem;
        .main-content {
          width: 100%;
          height: 24rem;
          overflow-y: auto;
          .city-info {
            width: 100%;
            padding: 0 1rem;
            .item1 {
              margin: 0.5rem 0;
              .city-img {
                display: inline-block;
                width: 1rem;
                height: 1rem;
                // vertical-align: bottom;
                margin: -4px 0.5rem 0 0;
              }
              .city-name {
                font-size: 1rem;
                color: #ff8b3d;
              }
              .mask-url {
                display: inline-block;
                margin: 0 0 0.2rem 0.5rem;
                border-bottom: 1px solid #b9e5f7;
                .a-mask {
                  color: #000;
                }
              }
            }
            .item2 {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              .district-info {
                margin: 0 0.8rem 0.5rem 0.8rem;
                .city-name2 {
                  display: inline-block;
                  box-sizing: border-box;
                  width: 7rem;
                  text-align: center;
                  // font-size: 0.12rem;
                  // padding: 1px 1px 1px 1px;
                  border-radius: 0.5rem 0 0 0.5rem;
                  font-size: 0.9rem;
                  line-height: 3rem;
                  height: 3rem;
                  vertical-align: middle;
                  font-weight: normal;
                  transform: scale(0.9, 0.8);
                  border: 0.01rem solid #b9e5f7;
                  border-right: 0;
                  background-color: #b9e5f7;
                  white-space: nowrap;
                }
                .city-url {
                  font-size: 0.7rem;
                  display: inline-block;
                  box-sizing: border-box;
                  width: 15rem;
                  text-align: center;
                  padding: 1px 1px 1px 1px;
                  border-radius: 0 0.5rem 0.5rem 0;
                  line-height: 2.4rem;
                  height: 2.4rem;
                  vertical-align: middle;
                  background-color: #fff;
                  color: #4d4d4d;
                  border: 0.1rem solid #b9e5f7;
                  border-left: 0;
                  white-space: nowrap;
                  transform: translateX(-0.7rem);
                  a {
                    color: #4d4d4d;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
