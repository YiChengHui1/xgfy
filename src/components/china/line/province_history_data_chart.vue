<template>
  <div id="province_history_data_chart"></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      legendData: ['累计确诊', '累计治愈', '累计死亡'], // 图例数据集合
      deadData: [],
      healData: [],
      // newConfirmData: [],
      confirmData: [],
      xAxisData: [],
      legendColor: [],
      chartName: ''
    }
  },
  props: {
    provinceChartData: Array
  },
  computed: {
    ...mapGetters(['provinceName'])
  },
  methods: {
    // 整理数据
    sortData () {
      this.chartName = this.provinceName + '疫情趋势图'
      if (this.provinceChartData) {
        this.provinceChartData.forEach(item => {
          this.xAxisData.push(item.date)
          this.confirmData.push(Number(item.confirm))
          this.healData.push(Number(item.heal))
          this.deadData.push(Number(item.dead))
        })
      }
    },
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      const dom = document.getElementById('province_history_data_chart')
      let myChart = this.$echarts.init(dom)
      setTimeout(function () {
        window.onresize = function () {
          myChart.resize()
        }
      }, 1)
      let seriesData = []
      if (this.legendData !== []) {
        this.legendData.forEach((item, index) => {
          switch (index) {
            case 0:
              seriesData.push({
                name: item,
                type: 'line',
                data: this.confirmData,
                itemStyle: {
                  normal: {
                    // show: false,
                    color: '#cc1e1e'
                  }
                }
              })
              break
            case 1:
              seriesData.push({
                name: item,
                type: 'line',
                data: this.healData,
                itemStyle: {
                  normal: {
                    // show: false,
                    color: '#178b50'
                  }
                }
              })
              break
            case 2:
              seriesData.push({
                name: item,
                type: 'line',
                data: this.deadData,
                itemStyle: {
                  normal: {
                    // show: false,
                    color: '#4e5a65'
                  }
                }
              })
              break
            default:
              break
          }
        })
      }
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: this.chartName,
          left: '5%'
          // textAlign: 'center'
        },
        tooltip: {
          trigger: 'axis'
          // triggerOn: 'mousemove'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData
        },
        // grid: {
        //   width: '75%',
        //   left: '15%'
        // },
        yAxis: {
          type: 'value'
        },
        legend: {
          right: '10%',
          data: this.legendData
        },
        series: seriesData
      }
      localStorage.setItem('option', JSON.stringify(option))
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
      }
    }
  },
  mounted () {
    this.sortData()
    this.drawChart()
  },
  watch: {
    provinceChartData: function (newList, oldList) {
      this.drawChart()
    }
  }
}
</script>
<style scoped>
#province_history_data_chart {
  width: 100%;
  height: 100%;
}
</style>
