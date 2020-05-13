<template>
  <div class="domestic_outbreak_china">
    <Content class="content">
      <div class="top-content">
        <div class="top-content-time">
          最近更新时间:{{lastUpdateTime}}
        </div>
        <div class="top-content-card">
          <Card
            v-for="(cardItem,index) in cardContent"
            :key="index"
            :class="cardStatus[index]? [cardStatus[index],'card']:'card' "
          >
            <p class="card-item card-name">{{cardItem.title? cardItem.title:'暂无数据'}}</p>
            <p class="card-item card-total-num">{{cardItem.totalNum? cardItem.totalNum:'暂无数据'}}</p>
            <p class="card-item card-add-num">较昨日<span>{{cardItem.addNum || cardItem.addNum===0? `${cardItem.addNum>=0?'+'+cardItem.addNum:cardItem.addNum}`:'暂无数据'}}</span></p>
          </Card>
        </div>
      </div>
      <div class="middle-content">
        <div class="middle-content-left">
          <div class="map-wrap">
            <div class="china-button">
              <span
                :class="{'current':chinaNowConfirmBtn[0].status}"
                @click="changeConfirm(0)"
              >现有确诊</span>
              <span
                :class="{'current':chinaNowConfirmBtn[1].status}"
                @click="changeConfirm(1)"
              >累计确诊</span>
              <span
                :class="{'current':chinaNowConfirmBtn[2].status}"
                @click="changeConfirm(2)"
              >累计死亡</span>
              <span
                :class="{'current':chinaNowConfirmBtn[3].status}"
                @click="changeConfirm(3)"
              >累计治愈</span>
            </div>
            <china-map
              v-if="isChinaMapShow"
              :chinaAreaData='chinaAreaData'
              :chooseStatus='chinaNowConfirmBtnStr'
            ></china-map>
          </div>
        </div>
        <div class="middle-content-right">
          <div class="chart-wrap">
            <div class="swiper-box">
              <Swiper
                :options="swiperOption"
                class="swiper"
              >
                <SwiperSlide>
                  <chart1 v-if="isChart1Show" :chartData="chart1Data"></chart1>
                </SwiperSlide>
                <SwiperSlide>
                  <chart2 v-if="isChart2Show" :chartData="chart2Data"></chart2>
                </SwiperSlide>
                <SwiperSlide>
                  <chart3 v-if="isChart3Show" :chartData="chart3Data"></chart3>
                </SwiperSlide>
                <SwiperSlide>
                  <chart4 v-if="isChart4Show" :chartData="chart4Data"></chart4>
                </SwiperSlide>
                <SwiperSlide>
                   <chart5 v-if="isChart5Show" :chartData="chart5Data"></chart5>
                </SwiperSlide>
                <SwiperSlide>
                  <chart6 v-if="isChart6Show" :chartData="chart6Data"></chart6>
                </SwiperSlide>
                <SwiperSlide>
                  <chart7 v-if="isChart7Show" :chartData="chart7Data"></chart7>
                </SwiperSlide>
              </Swiper>
              <div
                class="swiper-button-prev"
              ></div>
              <div
                class="swiper-button-next"
              ></div>

            </div>
          </div>
        </div>
      </div>
    </Content>

  </div>
</template>

<script>
import ChinaMap from '@/components/china/map'
import Chart1 from '@/components/china/line/china_day_trend_chart.vue'
import Chart2 from '@/components/china/line/china_daily_growth_chart.vue'
import Chart3 from '@/components/china/line/china_confirm_daily_growth_trend_chart.vue'
import Chart4 from '@/components/china/line/wuhan_daily_confirm_growth_chart.vue'
import Chart5 from '@/components/china/line/hubei_except_wuhan_daily_growth_chart.vue'
import Chart6 from '@/components/china/line/hubei_confirm_daily_growth_chart.vue'
import Chart7 from '@/components/china/line/china_except_hubei_confirm_daily_growth_chart.vue'
import { getTotalDataOne, getNcovMapsData } from '@/api/data.js'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
require('swiper/css/swiper.css')
export default {
  data () {
    return {
      cardContent: [
        // 首页六个卡片默认信息
        {
          title: '全国累计确诊',
          totalNum: null,
          addNum: null,
          status: 'confirm'
        },
        {
          title: '全国累计治愈',
          totalNum: null,
          addNum: null,
          status: 'heal'
        },
        {
          title: '全国累计死亡',
          totalNum: null,
          addNum: null,
          status: 'dead'
        },
        {
          title: '全国现有确诊',
          totalNum: null,
          addNum: null,
          status: 'nowconfirm'
        },
        {
          title: '无症状感染者',
          totalNum: null,
          addNum: null,
          status: 'noinfect'
        },
        {
          title: '全国境外输入',
          totalNum: null,
          addNum: null,
          status: 'import'
        }
      ],
      cardStatus: [
        // 首页六种卡片状态
        'confirm',
        'heal',
        'dead',
        'nowconfirm',
        'noinfect',
        'import'
      ],
      lastUpdateTime: '',
      isChinaMapShow: false, // 是否显示中国地图
      chinaAreaData: [], // 中国地图数据
      chinaNowConfirmBtn: [
        // 中国地图四种状态切换按钮的状态
        { status: true },
        { status: false },
        { status: false },
        { status: false }
      ],
      chinaNowConfirmBtnStr: '现有确诊',
      confirmMapData: [], // 全国累计确诊数组
      nowConfirmMapData: [], // 全国现有确诊数据数组
      deadMapData: [], // 全国死亡数据数组
      healMapData: [], // 全国治愈数据数组
      chinaProvinceMapData: [], // 所有省份疫情信息集合
      noDataProvince: [], // 没有地图疫情信息的省份名称数据
      provinceCardData: [], // 各个省份的卡片的信息
      chart1Data: [], // 图表一所需数据
      chart2Data: [], // 图表二所需数据
      chart3Data: [], // 图表三所需数据
      chart4Data: [], // 图表四所需数据
      chart5Data: [], // 图表五所需数据
      chart6Data: [], // 图表六所需数据
      chart7Data: [], // 图表七所需数据
      isChart3Show: false,
      isChart1Show: false,
      isChart2Show: false,
      isChart4Show: false,
      isChart5Show: false,
      isChart6Show: false,
      isChart7Show: false,
      swiperOption: {
        speed: 500, // 切换速度
        watchOverflow: false, // 当没有足够的slide切换时，例如只有1个slide（非loop），swiper会失效且隐藏导航等。默认不开启这个功能。
        loop: false, // 开启循环模式
        slidesPerView: 1,
        initialSlide: 0,
        preventClicksPropagation: true, // 阻止click冒泡。拖动Swiper时阻止click事件。
        simulateTouch: true, // 鼠标模拟手机触摸。默认为true，Swiper接受鼠标点击、拖动。
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
    'china-map': ChinaMap,
    'chart1': Chart1,
    'chart2': Chart2,
    'chart3': Chart3,
    'chart4': Chart4,
    'chart5': Chart5,
    'chart6': Chart6,
    'chart7': Chart7,
    Swiper,
    SwiperSlide
  },
  methods: {
    // 切换中国地图的四个选项的具体方法
    clearAndChangeConfirm (list, status, num) {
      this.chinaNowConfirmBtn.forEach((item, index) => {
        if (index === num) {
          item.status = true
        } else {
          item.status = false
        }
      })
      this.chinaAreaData = list
      this.chinaNowConfirmBtnStr = status
    },
    // 切换中国地图的四个选项
    changeConfirm (num) {
      switch (num) {
        case 0:
          this.clearAndChangeConfirm(this.nowConfirmMapData, '现有确诊', num)
          break
        case 1:
          this.clearAndChangeConfirm(this.confirmMapData, '累计确诊', num)
          break
        case 2:
          this.clearAndChangeConfirm(this.deadMapData, '累计死亡', num)
          break
        case 3:
          this.clearAndChangeConfirm(this.healMapData, '累计治愈', num)
          break
        default:
          break
      }
    },
    // 整理首页六个卡片数据
    getSixCardData (result) {
      this.cardContent.forEach(item => {
        switch (item.status) {
          case 'confirm':
            item.totalNum = result.chinaTotal.confirm
            item.addNum = result.chinaAdd.confirm
            break
          case 'heal':
            item.totalNum = result.chinaTotal.heal
            item.addNum = result.chinaAdd.heal
            break
          case 'dead':
            item.totalNum = result.chinaTotal.dead
            item.addNum = result.chinaAdd.dead
            break
          case 'nowconfirm':
            item.totalNum = result.chinaTotal.nowConfirm
            item.addNum = result.chinaAdd.nowConfirm
            break
          case 'noinfect':
            item.totalNum = result.chinaTotal.noInfect
            item.addNum = result.chinaAdd.noInfect
            break
          case 'import':
            item.totalNum = result.chinaTotal.importedCase
            item.addNum = result.chinaAdd.importedCase
            break
          default:
            break
        }
      })
    },
    // 整理中国地图数据
    getMapData (areaTree) {
      areaTree[0].children.forEach(item => {
        this.confirmMapData.push({
          name: item.name,
          value: item.total.confirm
        })
        this.nowConfirmMapData.push({
          name: item.name,
          value: item.total.nowConfirm
        })
        this.deadMapData.push({
          name: item.name,
          value: item.total.dead
        })
        this.healMapData.push({
          name: item.name,
          value: item.total.heal
        })
      })
      this.chinaAreaData = this.nowConfirmMapData
      this.isChinaMapShow = true
    },
    // 整理中国地图省份数据
    getChinaProvinceMapData (list) {
      list.forEach(item => {
        if (
          item.children.length === 1 &&
          item.children[0].name === '地区待确认'
        ) {
          this.noDataProvince.push(item.name)
        }
        let temp = []
        item.children.forEach(item2 => {
          temp.push({
            name: item2.name,
            value: [
              item2.total.nowConfirm,
              item2.total.confirm,
              item2.total.dead,
              item2.total.heal
            ]
          })
        })
        this.chinaProvinceMapData.push({
          name: item.name,
          list: temp
        })
      })
      this.$store.commit('CHANGE_NO_DATA_PROVINCE_NAME', {
        noDataProvince: this.noDataProvince
      })
      this.$store.commit('CHANGE_PROVINCE_MAP_DATA', {
        provinceMapData: this.chinaProvinceMapData
      })
    },
    // 整理各个省份的卡片的信息
    getProvinceCardData (list1) {
      list1.forEach(item => {
        let obj1 = {
          title: '累计确诊',
          totalNum: item.total.confirm,
          status: 'confirm'
        }
        let obj2 = {
          title: '累计治愈',
          totalNum: item.total.heal,
          status: 'heal'
        }
        let obj3 = {
          title: '累计死亡',
          totalNum: item.total.dead,
          status: 'dead'
        }
        let obj4 = {
          title: '现有确诊',
          totalNum: item.total.nowConfirm,
          status: 'nowconfirm'
        }
        let obj5 = {
          title: '新增确诊',
          totalNum: item.today.confirm,
          status: 'noinfect'
        }
        let obj6 = {
          title: '确诊减少',
          totalNum: item.today.confirmCuts,
          status: 'import'
        }
        let temp = []
        temp.push(obj1)
        temp.push(obj2)
        temp.push(obj3)
        temp.push(obj4)
        temp.push(obj5)
        temp.push(obj6)
        this.provinceCardData.push({
          name: item.name,
          list: temp
        })
      })
      this.$store.commit('CHANGE_PROVINCE_CARD_DATA', {
        provinceCardData: this.provinceCardData
      })
    },
    async getChinaData () {
      let res = await getTotalDataOne()
      if (res.status === 200) {
        let result = res.data.data
        // 数据更新时间数据
        this.lastUpdateTime = result.lastUpdateTime
        this.$store.commit('CHANGE_LAST_UPDATE_TIME', {
          lastUpdateTime: this.lastUpdateTime
        })
        let obj = {
          name: 'China',
          value: [result.chinaTotal.nowConfirm, result.chinaTotal.confirm, result.chinaTotal.dead, result.chinaTotal.heal]
        }

        this.$store.commit('CHANGE_CHINA_OBJ_INFO', {chinaTotalObj: obj})
        // 中国总体数据 上边六个卡片的数据
        this.getSixCardData(result)
        // 整理地图所需数据
        this.getMapData(result.areaTree)
        // 整理中国地图省份数据
        this.getChinaProvinceMapData(result.areaTree[0].children)
        // 整理各个省份的卡片的信息
        this.getProvinceCardData(result.areaTree[0].children)
      }
    },
    async getNcovMapsDataFun () {
      let res = await getNcovMapsData()
      if (res.status === 200) {
        let temp = res.data.data
        if (temp.chartsTree[0]) {
          this.chart1Data = temp.chartsTree[0]
          this.isChart1Show = true
        }
        if (temp.chartsTree[1]) {
          this.chart2Data = temp.chartsTree[1]
          this.isChart2Show = true
        }
        if (temp.chartsTree[2]) {
          this.chart3Data = temp.chartsTree[2]
          this.isChart3Show = true
        }
        if (temp.chartsTree[3]) {
          this.chart4Data = temp.chartsTree[3]
          this.isChart4Show = true
        }
        if (temp.chartsTree[4]) {
          this.chart5Data = temp.chartsTree[4]
          this.isChart5Show = true
        }
        if (temp.chartsTree[5]) {
          this.chart6Data = temp.chartsTree[5]
          this.isChart6Show = true
        }
        if (temp.chartsTree[6]) {
          this.chart7Data = temp.chartsTree[6]
          this.isChart7Show = true
        }
      }
    }
  },
  created () {
    this.getChinaData()
    this.getNcovMapsDataFun()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.domestic_outbreak_china {
  width: 100%;
  .content {
    width: 100%;
    height: 9.5rem;
    background-color: #fff;
    .top-content {
      width: 100%;
      height: 9rem;
      padding: 0 2rem;
      .top-content-time {
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
      }
      .top-content-card {
        width: 100%;
        height: 6.5rem;
        display: flex;
        justify-content: space-between;
        .card {
          width: 10rem;
          height: 6.5rem;
          .card-item {
            width: 100%;
            text-align: center;
            color: #000;
          }
          .card-total-num {
            font-weight: 600;
            font-size: 1.3rem;
          }
          .card-add-num {
            color: #7c7c7c !important;
          }
        }
        .confirm {
          background-color: #fdf1f1 !important;
          .card-total-num {
            color: #cc1e1e !important;
          }
          .card-add-num {
            span {
              color: #cc1e1e !important;
            }
          }
        }
        .heal {
          background-color: #f1f8f4;
          .card-total-num {
            color: #178b50 !important;
          }
          .card-add-num {
            span {
              color: #178b50 !important;
            }
          }
        }
        .dead {
          background-color: #f3f6f8;
          .card-total-num {
            color: #4e5a65 !important;
          }
          .card-add-num {
            span {
              color: #4e5a65 !important;
            }
          }
        }
        .nowconfirm {
          background-color: #fdf1f1;
          .card-total-num {
            color: #f23a3b !important;
          }
          .card-add-num {
            span {
              color: #f23a3b !important;
            }
          }
        }
        .noinfect {
          background-color: #faf2f6;
          .card-total-num {
            color: #ca3f81 !important;
          }
          .card-add-num {
            span {
              color: #ca3f81 !important;
            }
          }
        }
        .import {
          background-color: #fcf4f0;
          .card-total-num {
            color: #f05926 !important;
          }
          .card-add-num {
            span {
              color: #f05926 !important;
            }
          }
        }
      }
    }
    .middle-content {
      width: 100%;
      padding: 1rem 2rem;
      display: flex;
      .middle-content-left {
        width: 50%;
        height: 24rem;
        .map-wrap {
          width: 100%;
          height: 100%;
          position: relative;
          .china-button {
            position: absolute;
            // left: 3rem;
            top: 0;
            float: left;
            z-index: 2;
            height: 3rem;
            span {
              display: block;
              width: 5rem;
              line-height: normal;
              text-align: center;
              font-size: 1rem;
              padding: 0.2rem 0;
              border: 1px solid #efefef;
              float: left;
              position: relative;
              margin: 0 -1px;
              cursor: pointer;
            }
            span:nth-child(1) {
              border-radius: 1.6vw 0 0 1.6vw;
            }
            span:last-child {
              border-radius: 0 1.6vw 1.6vw 0;
            }
            .current {
              background-color: #eef4ff;
              border-color: #ccdeff;
              color: #005dff;
              z-index: 2;
            }
          }
        }
      }
      .middle-content-right {
        width: 50%;
        height: 24rem;
        .chart-wrap {
          width: 100%;
          height: 100%;
          .swiper-box {
            width: 100%;
            height: 100%;
            position: relative;
            .swiper{
              width: 100%;
              height: 100%;
            }
            .swiper-button-next {
              width: 2rem;
              height: 2rem;
              border: 2px solid #4e5a65;
              border-radius: 1rem;
              right: 0;
              background-size: 100% 100%;
              outline: none;
              color: #4e5a65;
              box-shadow:0 3px 9px rgba(0, 0, 0, 0.7);
              z-index: 100;
              // font-size: 1rem;
            }
            .swiper-button-prev {
              width: 2rem;
              height: 2rem;
              border: 2px solid #4e5a65;
              border-radius: 1rem;
              left: 0;
              background-size: 100% 100%;
              outline: none;
              color: #4e5a65;
              box-shadow:0 3px 9px rgba(0, 0, 0, 0.7);
              z-index: 100;
            }
            .swiper-button-prev:after {
              font-size: 1rem;
            }
            .swiper-button-next:after {
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>
