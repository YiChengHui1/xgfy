<template>
  <div id="wuhan_daily_confirm_growth_chart"></div>
</template>
<script>
export default {
  data () {
    return {
      legendData: [], // 图例数据集合
      newconfirmData: [],
      xAxisData: [],
      legendColor: [],
      chartName: ''
    }
  },
  props: {
    chartData: Object
  },
  methods: {
    // 整理数据
    sortData () {
      if (this.chartData) {
        this.chartName = this.chartData.name
        this.chartData.items.forEach(item => {
          this.legendData.push(item.name)
          this.legendColor.push(item.color)
        })
        this.chartData.datas.forEach(item2 => {
          this.xAxisData.push(item2.date)
          this.newconfirmData.push(Number(item2.newconfirm))
        })
      }
    },
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      const dom = document.getElementById('wuhan_daily_confirm_growth_chart')
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
                data: this.newconfirmData,
                itemStyle: {
                  normal: {
                    // show: false,
                    color: this.legendColor[index]
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
          left: '7%'
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
        yAxis: {
          type: 'value'
        },
        grid: {
          width: '75%',
          left: '15%'
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
    chinaAreaData: function (newList, oldList) {
      this.drawChart()
    }
  }
}
</script>
<style scoped>
#wuhan_daily_confirm_growth_chart {
  width: 100%;
  height: 100%;
}
</style>
