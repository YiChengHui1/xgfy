<template>
  <div class="city-vehicles">
    <Layout>
      <common-header></common-header>
      <Content class="content">
        <Card class="card">
          <div class="card-left">
            <div class="card-left-top">
              <h4 class="card-left-top-title">同乘车辆查询：</h4>
              <Form
                ref="formCustom"
                :model="formCustom"
                :rules="ruleCustom"
                :label-width="80"
              >
                <FormItem
                  label="日期"
                  prop="date"
                >
                  <DatePicker
                    type="date"
                    placeholder="选择日期"
                    v-model="formCustom.date"
                    format="yyyy-MM-dd"
                    @on-change="handleChange"
                  ></DatePicker>
                  <!-- <Input
                  type="Date"
                  v-model="formCustom.date"
                ></Input> -->
                </FormItem>
                <FormItem
                  label="车次编号"
                  prop="trainNumberCheck"
                >
                  <Input
                    type="text"
                    v-model="formCustom.trainNumberCheck"
                  ></Input>
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    @click="handleSubmit('formCustom')"
                  >提交</Button>
                  <Button
                    @click="handleReset('formCustom')"
                    style="margin-left: 8px"
                  >重置</Button>
                </FormItem>
              </Form>
            </div>
            <div class="card-left-bottom">
              查询结果：
              <div
                class="result"
                v-if="isShowInfoResult"
              >
                <div
                  class="have-data"
                  v-if="isHaveData"
                >
                  <p>{{`车次：${checkResult.no}`}}</p>
                  <p>{{`起点-终点：${checkResult.pos_start}-${checkResult.pos_end}`}}</p>
                  <p>{{checkResult===''? '':`患者座位号：${checkResult.no_sub}`}}</p>
                  <p>{{`日期：${checkResult.date}`}}</p>
                  <p><a :href="checkResult.source">点击查看详细信息</a></p>
                </div>
              </div>
              <div
                v-if="isShowNoDataResult"
                class="no-data"
              >
                <div>
                  无疫情记录
                </div>
              </div>
            </div>
          </div>
          <div class="card-right">
            <p>确诊人员乘坐交通的信息</p>
            <div class="card-right-content">
              <vehicles-table :vehiclesData="trainInfoPageData"></vehicles-table>
              <!-- <div
                class="content-item"
                v-for="trainInfo in trainInfoPageData"
                :key="trainInfo.value"
              >
                <div class="content-item-top">
                  <p>{{`编号：${trainInfo.no}`}}</p>
                  <p>{{`起点：${trainInfo.pos_start}`}}</p>
                  <p>{{`终点：${trainInfo.pos_end}`}}</p>
                </div>
                <div class="content-item-middle">
                  <p>{{`交通工具类型:${typeList[trainInfo.type]}`}}</p>
                  <p>{{`日期：${trainInfo.date}`}}</p>
                  <p v-if="trainInfo.source!==''"><a :href="trainInfo.source">查看详情>></a></p>
                </div>
              </div> -->
            </div>
            <Page
              v-if="trainInfoPageData!==[]"
              :total="allTrainInfo.length"
              size="small"
              :current='pageId'
              :page-size='pageSize'
              show-elevator
              class="pager"
              @on-change="changePageNum"
            />
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
import Header from '@/components/common/header'
import { getSameRideAll, getSameRide1 } from '@/api/data.js'
import VehiclesTable from '@/components/table/vehicles'
export default {
  data () {
    const dateCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择日期'))
      } else {
        // console.log(value)
        callback()
      }
    }
    const trainNumberCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入车次编号'))
      } else {
        callback()
      }
    }
    return {
      formCustom: {
        date: '',
        trainNumberCheck: ''
      },
      ruleCustom: {
        date: [{ required: true, validator: dateCheck, trigger: 'blur' }],
        trainNumberCheck: [
          { required: true, validator: trainNumberCheck, trigger: 'blur' }
        ]
      },
      checkResult: {}, // 查询结果
      isShowNoDataResult: false, // 是否显示没有疫情结果
      isShowInfoResult: false, // 是否显示疫情信息结果
      isHaveData: false, // 是否有疫情信息
      allTrainInfo: {}, // 所有车辆疫情信息
      pageId: 1, // 当前页码
      pageSize: 10, // M每页条数
      trainInfoPageData: [], // 每页的车辆疫情信息
      typeList: [
        '',
        '飞机', // 1飞机
        '火车', // 2火车
        '地铁',
        '客车',
        '公交',
        '出租车',
        '轮船',
        '其他'
      ]
    }
  },
  components: {
    'common-header': Header,
    'vehicles-table': VehiclesTable
  },
  methods: {
    handleChange (dateValue) {
      this.formCustom.date = dateValue
    },
    // 日期格式化
    dateFormatter (dateTime) {
      let formateDate = new Date(dateTime)
      let year = formateDate.getFullYear()
      let month = formateDate.getMonth() + 1
      let day = formateDate.getDate()
      return (
        year +
        '-' +
        (month <= 9 ? '0' + month : month) +
        '-' +
        (day <= 9 ? '0' + day : day) +
        ' '
      )

      // let tzoffset = (new Date()).getTimezoneOffset() * 60000
      // let finishTime = (new Date(Date.parse(dateTime) - tzoffset)).toISOString()
      // console.log(finishTime)
    },
    async getSameRide1Fun () {
      // this.dateFormatter(this.formCustom.date)
      if (String(this.formCustom.date).indexOf('GMT+0800') !== -1) {
        this.formCustom.date = this.dateFormatter(this.formCustom.date)
      }
      let params = {
        date: this.formCustom.date,
        no: this.formCustom.trainNumberCheck
      }
      // 2020-03-22 ET701 有疫情
      let res = await getSameRide1(params)
      if (res.status === 200) {
        this.$Message.success('查询成功!')
        if (res.data.data.total === 1) {
          this.checkResult = res.data.data.list[0]
          this.isHaveData = true
          this.isShowInfoResult = true
          this.isShowNoDataResult = false
        } else if (res.data.data.total === 0) {
          this.isShowNoDataResult = true
          this.isShowInfoResult = false
        }
      }
      // console.log(res)
    },
    async getSameRideAllFun () {
      let res = await getSameRideAll()
      if (res.status === 200) {
        this.allTrainInfo = res.data.data.list
        this.paging(this.pageSize, this.pageId)
      }
    },
    changePageNum (pageNum) {
      this.pageId = pageNum
      this.paging(this.pageSize, this.pageId)
    },
    // 实现分页
    paging (pagesize, current) {
      const tablePush = []
      // console.log(pagesize, current)
      this.allTrainInfo.forEach((item, index) => {
        item.car_type = this.typeList[item.type]
        if (
          pagesize * (current - 1) <= index &&
          index <= pagesize * current - 1
        ) {
          tablePush.push(item)
        }
      })
      this.trainInfoPageData = tablePush
      // return tablePush
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getSameRide1Fun()
          // console.log(this.formCustom.date, this.formCustom.trainNumberCheck)
          //
        } else {
          this.$Message.error('请输入完整信息!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  },
  created () {
    this.getSameRideAllFun()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.city-vehicles {
  width: 100%;
  .content {
    width: 100%;
    height: 35rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .card {
      width: 90vw;
      height: 30rem;
      /deep/.ivu-card-body {
        width: 100%;
        height: 100%;
        display: flex;
        .card-left {
          width: 25%;
          padding: 0 1rem;
          height: 100%;
          border-right: 2px solid #ccc;
          color: #000;
          // font-weight: 500;
          // border-radius: 0.5rem;
          .card-left-top {
            width: 100%;
            .card-left-top-title {
              font-size: 1rem;
              font-weight: 400;
              margin-bottom: 1rem;
            }
            .ivu-form {
              .ivu-form-item {
                .ivu-form-item-label {
                  color: #000;
                  font-weight: 500;
                }
              }
              .ivu-btn-default{
                color: #000;
              }
            }
          }
          .card-left-bottom {
            width: 100%;
            color: #000;
          }
        }
        .card-right {
          width: 75%;
          height: 100%;
          // border: 1px solid #b9e5f7;
          border-radius: 0 0.5rem 0.5rem 0;
          border-left: none;
          padding: 0 1rem;
          transform: translateX(-0.2rem);
          .card-right-content {
            width: 100%;
            height: 25rem;
            // padding: 0.5rem 1.5rem;
            .content-item {
              width: 100%;
              border-bottom: 1px solid #ccc;
              .content-item-top {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                p:nth-child(1) {
                  width: 30%;
                }
                p:nth-child(2) {
                  width: 30%;
                }
                p:nth-child(3) {
                  width: 30%;
                }
              }
              .content-item-middle {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                p:nth-child(1) {
                  width: 25%;
                }
                p:nth-child(2) {
                  width: 30%;
                }
                p:nth-child(3) {
                  width: 30%;
                }
              }
            }
          }
          .pager {
            margin-left: 50%;
          }
        }
      }
    }
  }
}
</style>
