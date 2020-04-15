<template>
  <div id="province-map"></div>
</template>
<script>
// 一共34个省份信息
import anhuiJson from '@/assets/map/province/anhui.json'
import aomenJson from '@/assets/map/province/aomen.json'
import beijingJson from '@/assets/map/province/beijing.json'
import chongqingJson from '@/assets/map/province/chongqing.json'
import fujianJson from '@/assets/map/province/fujian.json'
import gansuJson from '@/assets/map/province/gansu.json'
import guangdongJson from '@/assets/map/province/guangdong.json'
import guangxiJson from '@/assets/map/province/guangxi.json'
import guizhouJson from '@/assets/map/province/guizhou.json'
import hainanJson from '@/assets/map/province/hainan.json'

import hebeiJson from '@/assets/map/province/hebei.json'
import heilongjiangJson from '@/assets/map/province/heilongjiang.json'
import henanJson from '@/assets/map/province/henan.json'
import hubeiJson from '@/assets/map/province/hubei.json'
import hunanJson from '@/assets/map/province/hunan.json'
import jiangsuJson from '@/assets/map/province/jiangsu.json'
import jiangxiJson from '@/assets/map/province/jiangxi.json'
import jilinJson from '@/assets/map/province/jilin.json'
import liaoningJson from '@/assets/map/province/liaoning.json'
import neimengguJson from '@/assets/map/province/neimenggu.json'

import ningxiaJson from '@/assets/map/province/ningxia.json'
import qinghaiJson from '@/assets/map/province/qinghai.json'
import shandongJson from '@/assets/map/province/shandong.json'
import shanghaiJson from '@/assets/map/province/shanghai.json'
import shanxiJson from '@/assets/map/province/shanxi.json'
import shanxi1Json from '@/assets/map/province/shanxi1.json'
import sichuanJson from '@/assets/map/province/sichuan.json'
import taiwanJson from '@/assets/map/province/taiwan.json'
import tianjinJson from '@/assets/map/province/tianjin.json'
import xianggangJson from '@/assets/map/province/xianggang.json'

import xinjiangJson from '@/assets/map/province/xinjiang.json'
import xizangJson from '@/assets/map/province/xizang.json'
import yunnanJson from '@/assets/map/province/yunnan.json'
import zhejiangJson from '@/assets/map/province/zhejiang.json'

import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      provinceJSONList: [
        {name: 'anhui', jsondata: anhuiJson},
        {name: 'aomen', jsondata: aomenJson},
        {name: 'beijing', jsondata: beijingJson},
        {name: 'chongqing', jsondata: chongqingJson},
        {name: 'fujian', jsondata: fujianJson},
        {name: 'gansu', jsondata: gansuJson},
        {name: 'guangdong', jsondata: guangdongJson},
        {name: 'guangxi', jsondata: guangxiJson},
        {name: 'guizhou', jsondata: guizhouJson},
        {name: 'hainan', jsondata: hainanJson},
        {name: 'hebei', jsondata: hebeiJson},
        {name: 'heilongjiang', jsondata: heilongjiangJson},
        {name: 'henan', jsondata: henanJson},
        {name: 'hubei', jsondata: hubeiJson},
        {name: 'hunan', jsondata: hunanJson},
        {name: 'jiangsu', jsondata: jiangsuJson},
        {name: 'jiangxi', jsondata: jiangxiJson},
        {name: 'jilin', jsondata: jilinJson},
        {name: 'liaoning', jsondata: liaoningJson},
        {name: 'neimenggu', jsondata: neimengguJson},
        {name: 'ningxia', jsondata: ningxiaJson},
        {name: 'qinghai', jsondata: qinghaiJson},
        {name: 'shandong', jsondata: shandongJson},
        {name: 'shanghai', jsondata: shanghaiJson},
        {name: 'shanxi', jsondata: shanxiJson},
        {name: 'shanxi1', jsondata: shanxi1Json},
        {name: 'sichuan', jsondata: sichuanJson},
        {name: 'taiwan', jsondata: taiwanJson},
        {name: 'tianjin', jsondata: tianjinJson},
        {name: 'xianggang', jsondata: xianggangJson},
        {name: 'xinjiang', jsondata: xinjiangJson},
        {name: 'xizang', jsondata: xizangJson},
        {name: 'yunnan', jsondata: yunnanJson},
        {name: 'zhejiang', jsondata: zhejiangJson}
      ]
    }
  },
  props: {
    selectProvinceMapData: Array,
    chooseStatus: String,
    geoIndex: Number
  },
  computed: {
    ...mapGetters(['provinceName', 'provinceNameEn'])
  },
  methods: {
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      let tempJson = [{jsondata: {}}]
      tempJson = this.provinceJSONList.filter(item => item.name === this.provinceNameEn)
      this.$echarts.registerMap('province', tempJson[0].jsondata)
      const dom = document.getElementById('province-map')
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
          text: `COVID-19疫情地图(${this.provinceName})`,
          top: '10%',
          textAlign: 'center',
          left: '50%'
        },
        tooltip: {
          triggerOn: 'mousemove',
          formatter: function (e, t, n) {
            if (e.data) {
              if (e.data.value[that.geoIndex] || e.data.value[that.geoIndex] === 0) {
                return e.name + '<br />' + e.seriesName + '：' + e.data.value[that.geoIndex]
              }
            } else {
              return e.name + '：暂无数据'
            }
          }
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 10,
          bottom: 40,
          showLabel: !0,
          dimension: this.geoIndex,
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
          map: 'province',
          roam: true, // 开启缩放和平移
          scaleLimit: {
            min: 1,
            max: 6
          },
          // zoom: 1.23,
          top: 50,
          label: {
            normal: {
              show: !0,
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
            map: 'province',
            geoIndex: 0,
            data: this.selectProvinceMapData
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
    selectProvinceMapData: function (newList, oldList) {
      this.drawChart()
    },
    geoIndex: function (newNum, oldNum) {
      this.drawChart()
    },
    chooseStatus: function (newNum, oldNum) {
      this.drawChart()
    }
  }
}
</script>
<style scoped>
#province-map {
  width: 100%;
  height: 100%;
}
</style>
