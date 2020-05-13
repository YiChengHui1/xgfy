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
    worldAreaData: Array,
    chooseStatus: String,
    geoIndex: Number
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
      setTimeout(function () {
        window.onresize = function () {
          myChart.resize()
        }
      }, 1)
      let that = this
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
            convertEN2CN('China')
            if (e.data) {
              if (e.data.value[that.geoIndex] || e.data.value[that.geoIndex] === 0) {
                return convertEN2CN(e.name) + '<br />' + e.seriesName + '：' + e.data.value[that.geoIndex]
              }
            } else {
              return convertEN2CN(e.name) + '：暂无数据'
            }
          }
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 10,
          bottom: 40,
          showLabel: false,
          dimension: this.geoIndex,
          // text: ['高', '低'],
          pieces: [
            {
              gte: 100000,
              label: '100000人及以上',
              color: '#de1f05'
            },
            {
              gte: 10000,
              lt: 100000,
              label: '10000-99999人',
              color: '#ff2736'
            },
            {
              gte: 5000,
              lt: 10000,
              label: '5000-9999人',
              color: '#ff6341'
            },
            {
              gte: 1000,
              lt: 5000,
              label: '1000-4999人',
              color: '#ffa577'
            },
            {
              gte: 100,
              lt: 1000,
              label: '100-999 人',
              color: '#ffcea0'
            },
            {
              gte: 1,
              lt: 100,
              label: '1-99人',
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
          top: 70,
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
            data: this.worldAreaData
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
    worldAreaData: function (newList, oldList) {
      this.drawChart()
    },
    geoIndex: function (newNum, oldNum) {
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
