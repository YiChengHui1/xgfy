<template>
  <Header class="header">
    <div class="logo-img">
      <img
        class="school-logo"
        src="@/assets/imgs/db_logo.png"
        alt=""
      >
    </div>
    <div class="app-name">
      <p>COVID-19 Dashboard</p>
      <p>安阳工学院</p>
    </div>
    <div class="tab-bar-botton">
      <div
        class="tab-bar-content"
        v-for="content in tabContent"
        :key="content.value"
      >
        <router-link :to="{path:content.path}">
          <div class="content-name">{{content.name}}</div>
        </router-link>
      </div>
      <div class="tab-bar-content2">
        <button :class="['about-us',{'about-us-active':isAboutUsActive}]" @click="openModal">关于我们</button>
      </div>
    </div>
  </Header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabContent: [
        {
          path: '/dashboard',
          name: '国内疫情'
        },
        {
          path: '/foreign_epidemics',
          name: '国外疫情'
        },
        {
          path: '/query_epidemic_community',
          name: '疫情小区查询'
        },
        {
          path: '/rumor',
          name: '疫情辟谣'
        },
        {
          path: '/mask',
          name: '口罩信息'
        },
        {
          path: '/cityvehicles',
          name: '同乘车辆'
        }
      ],
      isAboutUsActive: false
    }
  },
  computed: {
    ...mapGetters(['isModalShow'])
  },
  methods: {
    openModal () {
      this.isAboutUsActive = true
      this.$store.commit('CHANGE_IS_MODAL_SHOW_INFO', {isModalShow: this.isAboutUsActive})
    }
  },
  created () {
    this.isAboutUsActive = this.isModalShow
  },
  watch: {
    isModalShow: function (newValue, oldValue) {
      this.isAboutUsActive = newValue
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
    margin-right: 0.5rem;
    .school-logo {
      display: inline-block;
      width: 7.8rem;
      height: 100%;
      vertical-align: top;
    }
  }
  .app-name {
    width: 11rem;
    height: 2.2rem;
    p:nth-child(1) {
      height: 1.3rem;
      line-height: 1.3rem;
      font-size: 1rem;
      font-weight: 600;
    }
    p:nth-child(2) {
      height: 0.9rem;
      line-height: 0.9rem;
      font-size: 0.8rem;
    }
  }
  .tab-bar-botton {
    width: 40rem;
    height: 2.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tab-bar-content {
      .content-name {
        line-height: 2.2rem;
        color: #fff;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.5);
      }
      .router-link-active {
        .content-name {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .tab-bar-content:hover {
      .content-name {
        color: rgba(255, 255, 255, 1);
      }
    }
    .tab-bar-content2 {
      .about-us {
        border: none;
        background-color: transparent;
        outline: none;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.5);
        &:hover {
          color: #fff;
        }
      }
      .about-us-active {
        color: #fff;
      }
    }
  }
}
</style>
