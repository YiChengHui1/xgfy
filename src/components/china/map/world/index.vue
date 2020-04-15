<template>
  <div id="word-map"></div>
</template>
<script>
import chinaJson from '@/assets/map/world-map.json'
import { convertEN2CN } from '@/utils/getCountryName.js'
// import chinaJson from '../../../utils/json/china.json'
import { mapGetters } from 'vuex'
export default {
  props: {
    chinaAreaData: Array,
    chooseStatus: String
  },
  computed: {
    ...mapGetters(['provinceCardData', 'provinceMapData'])
  },
  methods: {
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      this.$echarts.registerMap('china', chinaJson)
      const dom = document.getElementById('word-map')
      let myChart = this.$echarts.init(dom)
      // myChart.on('click', (params) => {
      //   if (params.name !== '南海诸岛') {
      //     this.$store.commit('CHANGE_PROVINCE_NAME', {provinceName: params.name})
      //     let nameEn = convertCN2EN(params.name)
      //     this.$store.commit('CHANGE_PROVINCE_NAME_EN', {provinceNameEn: nameEn})
      //     let res = this.provinceCardData.filter(item => item.name === params.name)
      //     this.$store.commit('CHANGE_SELECT_PROVINCE_CARD_DATA', {selectProvinceCardData: res[0].list})
      //     let res2 = this.provinceMapData.filter(item => item.name === params.name)
      //     this.$store.commit('CHANGE_SELECT_PROVINCE_MAP_DATA', {selectProvinceMapData: res2[0].list})
      //     this.$router.push({path: 'province'})
      //   }
      // })
      setTimeout(function () {
        window.onresize = function () {
          myChart.resize()
        }
      }, 1)
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: 'COVID-19疫情地图(世界)',
          top: '10%',
          textAlign: 'center',
          left: '50%'
        },
        tooltip: {
          triggerOn: 'mousemove',
          formatter: function (e, t, n) {
            console.log(e.name, e.seriesName, convertEN2CN(e.name))
            convertEN2CN('China')
            return !e.value && e.value !== 0
              ? e.name + '：暂无数据'
              : e.name + '<br />' + e.seriesName + '：' + e.value
          }
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 10,
          bottom: 40,
          showLabel: false,
          // text: ['高', '低'],
          pieces: [
            {
              gte: 10000,
              label: '10000人及以上',
              color: '#de1f05'
            },
            {
              gte: 1000,
              lt: 10000,
              label: '1000-9999人',
              color: '#ff2736'
            },
            {
              gte: 500,
              lt: 1000,
              label: '500-999人',
              color: '#ff6341'
            },
            {
              gte: 100,
              lt: 500,
              label: '100-499人',
              color: '#ffa577'
            },
            {
              gte: 10,
              lt: 100,
              label: '10-99 人',
              color: '#ffcea0'
            },
            {
              gte: 1,
              lt: 10,
              label: '1-9人',
              color: ' #ffe7b2'
            },
            {
              value: 0,
              label: '0人',
              color: '#e2ebf4'
            }
          ],
          show: !0
        },
        geo: {
          map: 'china',
          roam: true, // 开启缩放和平移
          scaleLimit: {
            min: 1,
            max: 5
          },
          // zoom: 1.23,
          top: 50,
          label: {
            normal: {
              show: false,
              fontSize: '14',
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              // shadowBlur: 50,
              // shadowColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: '#FFCC33',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: this.chooseStatus,
            type: 'map',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            // map: 'china',
            geoIndex: 0,
            data: this.chinaAreaData
          }
        ]
      }
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
    }
  },
  mounted () {
    this.drawChart()
  },
  watch: {
    chinaAreaData: function (newList, oldList) {
      this.drawChart()
    }
  }
}
</script>
<style scoped>
#word-map {
  width: 100%;
  height: 100%;
  /* width: 400px; */
  /* height: 400px; */
}
</style>
