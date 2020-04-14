<template>
  <div class="domestic_outbreak_provice">
    <Content class="content">
      <div class="top-content">
        <div class="top-content-time">
          最近更新时间:{{lastUpdateTime}}
        </div>
        <div class="top-content-card">
          <Card
            v-for="(cardItem,index) in selectProvinceCardData"
            :key="index"
            :class="cardStatus[index]? [cardStatus[index],'card']:'card' "
          >
            <p class="card-item card-name">{{cardItem.title? `${provinceName}${cardItem.title}`:'暂无数据'}}</p>
            <p class="card-item card-total-num">{{(cardItem.totalNum || cardItem.totalNum===0)? cardItem.totalNum:'暂无数据'}}</p>
          </Card>
        </div>
      </div>
      <div class="middle-content">
        <div class="middle-content-left">
          <div class="map-wrap">
            <div class="china-button">
              <span
                :class="{'current':provinceNowConfirmBtn[0].status}"
                @click="changeConfirm(0)"
              >现有确诊</span>
              <span
                :class="{'current':provinceNowConfirmBtn[1].status}"
                @click="changeConfirm(1)"
              >累计确诊</span>
               <span
                :class="{'current':provinceNowConfirmBtn[2].status}"
                @click="changeConfirm(2)"
              >累计死亡</span>
              <span
                :class="{'current':provinceNowConfirmBtn[3].status}"
                @click="changeConfirm(3)"
              >累计治愈</span>
            </div>
            <div class="back-to-previous">
              <img class="back-img"  @click="$router.push({path:'/dashboard/china'})" src="@/assets/imgs/back_home.jpg" alt="返回上一级" title="返回上一级">
            </div>
            <province-map
              :selectProvinceMapData='selectProvinceMapData'
              :chooseStatus='provinceNowConfirmBtnStr'
              :geoIndex='provinceStatusIndex'
            ></province-map>
          </div>
        </div>
      </div>
    </Content>

  </div>
</template>

<script>
import Header from '@/components/common/header' // 引入头部组件
import ProvinceMap from '@/components/china/map/province'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      // cardContent: [],
      cardStatus: [
        'confirm',
        'heal',
        'dead',
        'nowconfirm',
        'noinfect',
        'import'
      ],
      // lastUpdateTime: '',
      isProvinceMapShow: true,
      isProvinceCardShow: true,
      provinceNowConfirmBtn: [
        {status: true},
        {status: false},
        {status: false},
        {status: false}
      ],
      provinceNowConfirmBtnStr: '现有确诊',
      provinceStatusIndex: 0
    }
  },
  computed: {
    ...mapGetters([ 'provinceName', 'selectProvinceCardData', 'selectProvinceMapData', 'lastUpdateTime' ])
  },
  components: {
    'common-header': Header,
    'province-map': ProvinceMap
  },
  methods: {
    clearAndChangeConfirm (list, status, num) {
      this.provinceNowConfirmBtn.forEach((item, index) => {
        if (index === num) {
          item.status = true
        } else {
          item.status = false
        }
      })
      this.provinceAreaData = list
      this.provinceNowConfirmBtnStr = status
      this.provinceStatusIndex = num
    },
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
    }
  },
  created () {
    console.log(this.provinceName)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.domestic_outbreak_provice {
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
      .middle-content-left {
        width: 60%;
        height: 25rem;
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
          .back-to-previous{
            position: absolute;
            left: 30rem;
            top: 0;
            float: left;
            z-index: 2;
            height: 3rem;
            .back-img{
              display: block;
              width: 2rem;
              height: 2rem;
            }
          }
        }
      }
    }
  }
}
</style>
