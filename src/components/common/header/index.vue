<template>
  <Header class="header">
    <div class="logo-img">
      <img class="school-logo" src="@/assets/imgs/db_logo.png" alt="" >
    </div>
    <div class="app-name">
      <p>COVID-19 Dashboard</p>
      <p>安阳工学院</p>
    </div>
    <div class="tab-bar-botton">
      <!-- <div class="content-left"> -->
        <div class="tab-bar-content">
          <router-link :to="{path:'/domestic_outbreak'}">
            <div class="content-name">国内疫情</div>
          </router-link>
        </div>
        <div class="tab-bar-content">
          <router-link :to="{path:'/foreign_epidemics'}">
            <div class="content-name">国外疫情</div>
          </router-link>
        </div>
        <div class="tab-bar-content">
          <router-link :to="{path:'/query_epidemic_community'}">
            <div class="content-name">疫情小区查询</div>
          </router-link>
        </div>
      </div>
  </Header>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header {
  width: 100%;
  background-color: #343a40 !important;
  display: flex;
  align-items: center;
  color: #fff;
  .logo-img {
    width: 2.3rem;
    height: 2.2rem;
    overflow: hidden;
    .school-logo {
      display: inline-block;
      width: 7.8rem;
      height: 100%;
      vertical-align: top;
    }
  }
  .app-name{
    width: 11rem;
    height: 2.2rem;
    p:nth-child(1){
      height: 1.3rem;
      line-height: 1.3rem;
      font-size: 1rem;
      font-weight: 600;
    }
    p:nth-child(2){
      height: 0.9rem;
      line-height: 0.9rem;
      font-size: 0.8rem;
    }
  }
  .tab-bar-botton{
    width: 16rem;
    height: 2.2rem;
    display: flex;
    justify-content: space-between;
    .tab-bar-content{
      .content-name{
        line-height: 2.2rem;
        color: #fff;
        font-size: 1rem;
        color: rgba(255,255,255,.5);
      }
      .router-link-active{
        .content-name{
          color: rgba(255,255,255,1);
        }
      }
    }
    .tab-bar-content:hover{
      .content-name{
          color: rgba(255,255,255,1);
        }
    }
  }
}
</style>
