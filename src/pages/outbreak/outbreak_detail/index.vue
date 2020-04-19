<template>
  <div class="outbreak-detail">
    <Content class="content">
      <Card class="card">
        <el-image
          v-if="rumor.titlemark"
          class="result-image"
          placeholder="谣言鉴定结果图片"
          :src="`https://mat1.gtimg.com/www/coral/jiaozhen/imgs/marks/${rumor.titlemark}.png`"
        ></el-image>
        <div class="top-content">
          <p class="rumor-title">{{rumor.title}}</p>
          <p><i>流传说法：</i>{{rumor.rumor}}</p>
        </div>
        <div class="middle-content">
          <p v-if="rumor.markstyle==='true'">
            <span class="true-identification">较真鉴定：</span>
            <span class="mask-title mask-title-true">{{rumor.result}}</span><span class="mask-text mask-text-true">{{rumor.explain}}</span>
          </p>
          <p v-if="rumor.markstyle==='fake'">
            <span class="true-identification">较真鉴定：</span>
            <span class="mask-title mask-title-fake">{{rumor.result}}</span><span class="mask-text mask-text-fake">{{rumor.explain}}</span>
          </p>
          <p v-if="rumor.markstyle==='doubt'">
            <span class="true-identification">较真鉴定：</span>
            <span class="mask-title mask-title-doubt">{{rumor.result}}</span><span class="mask-text mask-text-doubt">{{rumor.explain}}</span>
          </p>
          <p class="verification-points">查证要点：</p>
          <div v-if="rumor.abstract && rumor.abstract.length>0">
            <p
              v-for="(item,index) in rumor.abstract"
              :key="item.value"
              class="rumor-abstract"
            ><span class="kuang">{{index+1}}</span>{{item.content}}</p>
            <p class="verifier-info"><span class="verifier">{{`查证者：${rumor.Author.name}`}}</span><span>{{rumor.Author.desc}}</span></p>
          </div>
          <p v-else>暂无信息</p>
        </div>
        <div class="bottom-content">
          <p>{{`时间：${rumor.date}`}}</p>
          <p>{{`来源：${rumor.source}`}}</p>
        </div>
        <div class="bottom-choose">
          <span>
            <a :href='`https://vp.fact.qq.com/article?id=${chooseRumorId}`'>查看原文</a>
            </span>|<span @click="$router.push({path:'/rumor/list'})">返回上一级</span>
        </div>
      </Card>
    </Content>
  </div>
</template>

<script>
import Header from '@/components/common/header'
import { getRumorDetail } from '@/api/data.js'
import { mapGetters } from 'vuex'
import { Image } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default {
  data () {
    return {
      rumor: {
        title: '',
        rumor: '暂无数据',
        abstract: [],
        Author: {
          name: '暂无信息',
          desc: '暂无信息'
        },
        titlemark: ''
      }
    }
  },
  computed: {
    ...mapGetters(['chooseRumorId'])
  },
  components: {
    'common-header': Header,
    'el-image': Image
  },
  methods: {
    async getRumorDetailFun () {
      let params = {
        id: this.chooseRumorId
      }
      let res = await getRumorDetail(params)
      // console.log(res)
      if (res.status === 200) {
        this.rumor = res.data.data
        console.log(this.rumor)
      }
    }
  },
  created () {
    this.getRumorDetailFun()
  },
  watch: {
    chooseRumorId: function (newId, oldId) {
      this.chooseRumorId = newId
      this.getRumorDetailFun()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.outbreak-detail {
  width: 100vw;
  .content {
    width: 100vw;
    height: 35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .card {
      width: 90vw;
      height: 30rem;
      p {
        font-size: 1rem;
      }
      .top-content {
        .rumor-title {
          margin-bottom: 0.5rem;
        }
      }
      .middle-content {
        width: 100%;
        margin-top: 1rem;
        .rumor-abstract{
          margin: 0.2rem 0;
        }
        .true-identification {
          font-weight: 600;
          margin: 1rem 0;
        }
        .mask-title {
          // display: inline-block;
          font-size: 1rem;
          padding: 1px 1px 1px 1px;
          border-radius: 3px 0 0 3px;
          line-height: 1.5rem;
          height: 1.5rem;
          vertical-align: middle;
          font-weight: normal;
          color: #fff;
          transform: scale(0.9, 0.8);
        }
        .mask-title-true {
          border: 0.1rem solid #42a163;
          border-right: 0;
          background-color: #42a163;
          white-space: nowrap;
        }
        .mask-title-doubt {
          border: 0.1rem solid #484848;
          border-right: 0;
          background-color: #484848;
          white-space: nowrap;
        }
        .mask-title-fake {
          border: 0.1rem solid #c41f20;
          border-right: 0;
          background-color: #c41f20;
          white-space: nowrap;
        }
        .mask-text {
          font-size: 1rem;
          padding: 1px 1px 1px 1px;
          border-radius: 0 2px 2px 0;
          line-height: 1.5rem;
          height: 1.5rem;
          vertical-align: middle;
          background-color: #fff;
        }
        .mask-text-true {
          color: #42a163;
          border: 0.1rem solid #42a163;
          border-left: 0;
          white-space: nowrap;
        }
        .mask-text-doubt {
          color: #484848;
          border: 0.1rem solid #484848;
          border-left: 0;
          white-space: nowrap;
        }
        .mask-text-fake {
          color: #c41f20;
          border: 0.1rem solid #c41f20;
          border-left: 0;
          white-space: nowrap;
        }
        .verification-points {
          font-weight: 600;
          margin: 1rem 0;
        }
        .verifier-info {
          margin: 1rem 0;
        }
        .verifier {
          display: inline-block;
          margin-right: 1rem;
          font-weight: 600;
        }
      }
      .bottom-content {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        p {
          margin-left: 1rem;
        }
      }
      .result-image {
        position: absolute;
        right: 0;
        top: -2rem;
        width: 4.3rem;
        height: 4.3rem;
      }
      .rumor-title {
        font-size: 1.2rem;
        font-weight: 500;
      }
      .kuang {
        display: inline-block;
        padding: 0 0.2rem;
        margin-right: 0.3rem;
        background-color: #000;
        color: #fff;
      }
      .bottom-choose{
        width: 100%;
        margin-top: 0.5rem;
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
        span{
          a{
            color: rgb(81, 90, 110);
          }
        }
      }
    }
  }
}
</style>
