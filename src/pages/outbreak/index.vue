<template>
  <div class="outbreak">
    <Layout>
      <common-header></common-header>
      <Content class="content">
        <div class="container-content">
          <Card
            class="card-item"
            v-for="rumor in rumorList"
            :key="rumor.value"
          >
            <div class="item-top">
              <div
                class="card-item-title"
                :title="rumor.title"
              >
                {{rumor.title}}
              </div>
            </div>
            <div class="item-bottom">
              <div class="item-left">
                <div class="card-item-result">
                  <p v-if="rumor.result==='真'">验证结果：<span class="rumor-true">{{rumor.explain}}</span></p>
                  <p v-if="rumor.result==='假'">验证结果：<span class="rumor-false">{{rumor.explain}}</span></p>
                  <p v-if="rumor.result==='疑'">验证结果：<span class="rumor-suspect">{{rumor.explain}}</span></p>
                </div>
                <div
                  class="card-item-author"
                  :title="rumor.authordesc"
                >{{`查证者身份：${rumor.authordesc}`}}</div>
                <div
                  class="card-item-tag"
                  :title="`${rumor.tag[0]}、${rumor.tag[1]}`"
                >
                  {{`标签：${rumor.tag[0]}、${rumor.tag[1]}`}}
                </div>
                <div class="card-item-date">{{`日期：${rumor.date}`}}</div>
              </div>
              <div class="item-right">
                <div class="card-item-image-wrap">
                  <el-image
                    class="card-item-image"
                    :src="rumor.coverrect"
                  ></el-image>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <Page
          v-if="rumorList[0]!=null"
          :total="100"
          size="small"
          :current='pageId'
          :page-size='pageSize'
          show-elevator
          class="pager"
          @on-change="changePageNum"
        />
      </Content>
    </Layout>
  </div>
</template>

<script>
import Header from '@/components/common/header'
import { getRumorList } from '@/api/data.js'
import { Image } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
  data () {
    return {
      pageId: 1, // 当前页码
      pageSize: 9, // M每页条数
      rumorList: []
    }
  },
  components: {
    'common-header': Header,
    'el-image': Image
  },
  methods: {
    changePageNum (pageNum) {
      this.pageId = pageNum
      this.getRumorListFun()
    },
    // 获取谣言列表
    async getRumorListFun () {
      let params = { page: this.pageId - 1 }
      let res = await getRumorList(params)
      if (res.status === 200) {
        res.data.data.splice(0, 1)
        this.rumorList = res.data.data
        console.log(this.rumorList)
      }
    }
  },
  created () {
    this.getRumorListFun()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.outbreak {
  width: 100vw;
  .content {
    width: 100vw;
    height: 35rem;
    .container-content {
      width: 100%;
      height: 32rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 1.5rem 1rem 0;
      .card-item {
        width: 31%;
        height: 9rem;
        min-width: 31%;
        max-width: 31%;
        cursor: pointer;
        /deep/.ivu-card-body {
          width: 100%;
          height: 100%;
          .item-top {
            width: 100%;
            height: 20%;
            .card-item-title {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .item-bottom {
            width: 100%;
            height: 80%;
            display: flex;
            .item-left {
              width: 57%;
              height: 100%;
              margin-right: 3%;
              .card-item-author {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .card-item-tag {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .item-right {
              width: 40%;
              height: 100%;
              .card-item-image-wrap {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
              }
              .card-item-image {
                width: 100%;
                height: 90%;
              }
            }
            span {
              display: inline-block;
              color: #fff;
              padding: 0.01rem 0.05rem;
              font-family: "Times New Roman", Georgia, Serif;
            }
            .rumor-true {
              background-color: #42a163;
            }
            .rumor-false {
              background-color: #c41f20;
            }
            .rumor-suspect {
              background-color: #484848;
            }
          }
        }
      }
    }
  }
  .pager {
    margin-left: 63%;
  }
}
</style>
