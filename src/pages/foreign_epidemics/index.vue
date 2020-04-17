<template>
  <div class="foreign_epidemics">
    <Layout>
      <common-header></common-header>
      <Content class="content">
        <div class="top-content">
          <div class="top-content-card">
            <Card
              v-for="(cardItem,index) in cardContent"
              :key="index"
              :class="cardStatus[index]? [cardStatus[index],'card']:'card' "
            >
              <p class="card-item card-name">{{cardItem.title? cardItem.title:'暂无数据'}}</p>
              <p class="card-item card-total-num">{{cardItem.totalNum? cardItem.totalNum:'暂无数据'}}</p>
            </Card>
          </div>
        </div>
        <div class="middle-content">
        <div class="middle-content-left">
          <div class="map-wrap">
            <div class="china-button">
              <span
                :class="{'current':worldNowConfirmBtn[0].status}"
                @click="changeConfirm(0)"
              >现有确诊</span>
              <span
                :class="{'current':worldNowConfirmBtn[1].status}"
                @click="changeConfirm(1)"
              >累计确诊</span>
              <span
                :class="{'current':worldNowConfirmBtn[2].status}"
                @click="changeConfirm(2)"
              >累计死亡</span>
              <span
                :class="{'current':worldNowConfirmBtn[3].status}"
                @click="changeConfirm(3)"
              >累计治愈</span>
            </div>
            <world-map
              v-if="isWorldMapShow"
              :worldAreaData='worldAreaData'
              :chooseStatus='worldNowConfirmBtnStr'
              :geoIndex='worldStatusIndex'
            ></world-map>
          </div>
        </div>
        <div class="middle-content-right">
          <div class="middle-content-title-setting">
            <p class="table-title">海外疫情</p>
            <div @click="changeTableStatus">
              <Radio v-model="single">表格间隔显示不同颜色</Radio>
            </div>
          </div>
          <div class="table-wrap">
            <world-table :continentsTotalData = 'continentsTotalData' :status='single'></world-table>
          </div>
        </div>
      </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
import Header from '@/components/common/header'
import { getTotalDataTwo } from '@/api/data.js'
import WorldMap from '@/components/china/map/world'
import { convertCN2EN } from '@/utils/getCountryName.js'
import { mapGetters } from 'vuex'
import WorldTable from '@/components/table'
export default {
  data () {
    return {
      cardContent: [
        // 世界六个卡片默认信息
        {
          title: '世界累计确诊',
          totalNum: null,
          addNum: null,
          status: 'confirm'
        },
        {
          title: '世界累计治愈',
          totalNum: null,
          addNum: null,
          status: 'heal'
        },
        {
          title: '世界累计死亡',
          totalNum: null,
          addNum: null,
          status: 'dead'
        },
        {
          title: '世界现有确诊',
          totalNum: null,
          addNum: null,
          status: 'nowconfirm'
        },
        {
          title: '新增累计确诊',
          totalNum: null,
          addNum: null,
          status: 'noinfect'
        },
        {
          title: '疫情国家地区数目',
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
      worldNowConfirmBtn: [
        // 地图四种状态切换按钮的状态
        { status: true },
        { status: false },
        { status: false },
        { status: false }
      ],
      worldStatusIndex: 0,
      worldNowConfirmBtnStr: '现有确诊',
      isWorldMapShow: false, // 是否显示世界地图
      worldAreaData: [], // 世界地图数据
      continentsTotalData: [], // 世界表格数据
      single: false
    }
  },
  components: {
    'common-header': Header,
    'world-map': WorldMap,
    'world-table': WorldTable
  },
  computed: {
    ...mapGetters(['chinaTotalObj'])
  },
  methods: {
    // 整理首页六个卡片数据
    getSixCardData (result) {
      let info = result.foreign.info
      this.cardContent.forEach(item => {
        switch (item.status) {
          case 'confirm':
            item.totalNum = info.sure_cnt
            break
          case 'heal':
            item.totalNum = info.cure_cnt
            break
          case 'dead':
            item.totalNum = info.die_cnt
            break
          case 'nowconfirm':
            item.totalNum = info.present
            break
          case 'noinfect':
            item.totalNum = info.sure_new_cnt
            break
          case 'import':
            item.totalNum = result.foreign.list.length
            break
          default:
            break
        }
      })
    },
    // 切换地图的四个选项的具体方法
    clearAndChangeConfirm (status, num) {
      this.worldNowConfirmBtn.forEach((item, index) => {
        if (index === num) {
          item.status = true
        } else {
          item.status = false
        }
      })
      this.worldNowConfirmBtnStr = status
      this.worldStatusIndex = num
    },
    changeConfirm (num) {
      switch (num) {
        case 0:
          this.clearAndChangeConfirm('现有确诊', num)
          break
        case 1:
          this.clearAndChangeConfirm('累计确诊', num)
          break
        case 2:
          this.clearAndChangeConfirm('累计死亡', num)
          break
        case 3:
          this.clearAndChangeConfirm('累计治愈', num)
          break
        default:
          break
      }
    },
    // 获取所有数据
    async getWorldData () {
      let res = await getTotalDataTwo()
      if (res.status === 200) {
        let result = res.data.data
        if (result.foreign.list && result.foreign.list.length !== 0) {
          this.worldAreaData.push(this.chinaTotalObj)
          result.foreign.list.forEach(item => {
            if (item.country === '也门') {
              item.continent = '亚洲'
            }
            this.worldAreaData.push({
              name: convertCN2EN(item.country),
              value: [item.present, item.sure_cnt, item.die_cnt, item.cure_cnt]
            })

            // console.log(item.country, countryList2.filter(item2 => item2 === item.country))
            // if (countryList2.filter(item2 => item2 === item.country).length === 0) {
            //   console.log(item.country)
            // }
          })
          this.isWorldMapShow = true
        }
        this.getSixCardData(result)
        this.continentsTotalData = result.foreign.list
      }
    },
    // 更改表格的显示
    changeTableStatus () {
      this.single = !this.single
    }
  },
  created () {
    this.getWorldData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.foreign_epidemics {
  width: 100%;
  .content {
    width: 100%;
    height: 9.5rem;
    background-color: #fff;
    .top-content {
      width: 100%;
      height: 9rem;
      padding: 1.5rem 2rem;
      // .top-content-time {
      //   width: 100%;
      //   height: 2.5rem;
      //   line-height: 2.5rem;
      // }
      .top-content-card {
        width: 100%;
        height: 6.5rem;
        display: flex;
        justify-content: space-between;
        .card {
          width: 10rem;
          height: 5.5rem;
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
        .middle-content-title-setting{
          display: flex;
          .table-title{
            color: #6fa8dc;
            font-weight: 600;
            font-size: 1.1rem;
            margin-right: 3rem;
          }
        }
        .table-wrap {
          width: 100%;
          height: 21.5rem;
        }
      }
    }
  }
}
</style>
