<template>
  <div class="map-wrapper">
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      :auto-resize="true"
      :scroll-wheel-zoom="true"
    >
      <bm-local-search
        :auto-viewport="autoViewport"
        :keyword="keyword"
        :pageCapacity="pageCapacity"
        :panel="panelShow"
        @infohtmlset="infohtmlset"
      ></bm-local-search>
      <bm-navigation
        anchor="BMAP_ANCHOR_TOP_RIGHT"
        :offset="{width:0,height:100}"
        :enableGeolocation="true"
      ></bm-navigation>
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
      <bm-marker
        v-bind:items="items"
        v-for="(item, index) in items"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item.id"
        :position="{'lng':item.position[0],'lat':item.position[1]}"
        :dragging="false"
        @click="infoWindowOpen(index)"
      >
        <bm-info-window
        :autoPan="true"
        :show="item.show"
        :closeOnClick="true"
        @close="infoWindowClose(index)"
        @open="infoWindowOpen(index)"
      >
        <el-tag effect="dark">{{item.province}}</el-tag>

        <el-tag type="warning" effect="dark">{{item.city}}</el-tag>

        <el-tag type="danger" effect="dark">{{item.county}}</el-tag>

        <h5>{{item.detail}}</h5>

        <div>来源自:<el-link :href="item.sourceUrl" target="_blank" type="primary">{{item.infoSource}}</el-link></div>
        <p>发布时间:{{getExactTime(item.updateTime)}}</p>
      </bm-info-window>
      </bm-marker>
      <bm-city-list
        class="bm-city-list"
        anchor="BMAP_ANCHOR_TOP_LEFT"
        :offset="{width:30,height:90}"
      ></bm-city-list>
    </baidu-map>
    <div class="search-content">
      <img
        src="@/assets/imgs/ncovmapshlogo.png"
        alt=""
        class="search-img"
      >
      <input
        v-model="keyword"
        class="search-input"
        placeholder="输入关键字后选择地址"
      >
    </div>
  </div>
</template>

<script>
import {Tag, Link} from 'element-ui'
export default {
  props: ['items'],
  components: {
    'el-tag': Tag,
    'el-link': Link
  },
  data () {
    return {
      // items: this.data,
      center: { lng: 116.404, lat: 39.915 },
      zoom: 5,
      location: '',
      keyword: '',
      pageCapacity: 6,
      autoViewport: true,
      panelShow: true
    }
  },
  methods: {
    infoWindowClose (index) {
      //  console.log(index)
      this.items[index].show = false
    },
    infoWindowOpen (index) {
      // console.log(index)

      this.items[index].show = true
    },
    getExactTime (time) {
      var date = new Date(time * 1000)
      // window.console.log(time)
      var year = date.getFullYear() + '-'
      var month =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var dates =
        date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()
      // var hour = date.getHours() + ':';
      // var min = date.getMinutes() + ':';
      // var second = date.getSeconds();
      return year + month + dates
    },
    // 标注气泡内容创建后的回调函数
    infohtmlset (poi) {
      this.panelShow = false
      let params = {
        province: poi.province,
        city: poi.city
      }
      this.$store.commit('CHANGE_PROVINCE_CITY_MAP', {mapProvinceCityInfo: params})
    }
  },
  watch: {
    keyword: function (newValue, oldValue) {
      this.panelShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.map-wrapper {
  width: 100%;
  height: 90%;
  .map {
    width: 100%;
    height: 89%;
    position: absolute;
    div:nth-child(2) {
      position: absolute;
      width: 58.5rem;
      // height: 10rem;
      top: 3rem;
      left: 10%;
      // overflow-y: auto;
    }
  }
  .search-content {
    // width: 10rem;
    height: 3rem;
    position: absolute;
    left: 10%;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 1rem;
    border-radius: 0.3rem;
    .search-img {
      display: inline-block;
      width: 6rem;
      height: 1.3rem;
      padding-right: 0.5rem;
      border-right: 1px solid #999;
    }
    .search-input {
      display: inline-block;
      margin-left: 0.5rem;
      width: 50rem;
      font-size: 1rem;
      border: none;
      outline: none;
    }
  }
  .el-tag {
    margin-left: 5px;
  }
}
</style>
