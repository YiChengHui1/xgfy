<template>
  <div class="map-wrapper">
    <baidu-map
      class="map"
      :center="center"
      :zoom="zoom"
      :auto-resize="true"
      :scroll-wheel-zoom="true"
      @ready="handler"
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
        :items="items"
        v-for="(item, index) in items"
        :item="item"
        :index="index"
        :key="item.id"
        :position="{'lng':item.position[0],'lat':item.position[1]}"
        :dragging="false"
        :icon="{url: require('../../assets/imgs/poi_marker_red.png'), size: {width: 20, height: 20},imageSize:{width: 20, height: 20}}"
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

          <el-tag
            type="warning"
            effect="dark"
          >{{item.city}}</el-tag>

          <el-tag
            type="danger"
            effect="dark"
          >{{item.county}}</el-tag>

          <p class="detail">{{`详细地址:${item.detail}`}}</p>
          <p>发布时间:{{item.updateTime}}</p>
        </bm-info-window>
      </bm-marker>
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
import { Tag, Link } from 'element-ui'
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
      zoom: 11,
      location: '',
      keyword: '',
      pageCapacity: 6,
      autoViewport: true,
      panelShow: true
    }
  },
  methods: {
    infoWindowClose (index) {
      this.items[index].show = false
    },
    infoWindowOpen (index) {
      this.items[index].show = true
    },
    // 标注气泡内容创建后的回调函数
    infohtmlset (poi) {
      this.panelShow = false
      let params = {
        // province: poi.province,
        cityName: poi.city
      }
      this.$store.commit('CHANGE_PROVINCE_CITY_MAP', {
        mapProvinceCityInfo: params
      })
    },
    handler ({BMap, map}) {
      let _this = this // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(function (r) {
        let param = {
          // province: r.address.province,
          cityName: r.address.city
        }
        _this.$store.commit('CHANGE_PROVINCE_CITY_MAP', {
          mapProvinceCityInfo: param
        })
        _this.center = {lng: r.longitude, lat: r.latitude} // 设置center属性值
        _this.autoLocationPoint = {lng: r.longitude, lat: r.latitude} // 自定义覆盖物
        _this.initLocation = true
        // _this.$store.commit('CHANGE_MAP_CENTER_DATA', {mapCenterData: _this.center})
        // console.log('center:', _this.center) // 如果这里直接使用this是不行的
      }, {enableHighAccuracy: true})

      // 下面注释是百度地图API官方实现方法，因为我使用自定义图标覆盖物，所以没有使用这种方法！
      // 如使用以下这种方法，那么我Template里所写的自定义定位图标代码是不需要的
      // var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(function(r){
      // if(this.getStatus() == BMAP_STATUS_SUCCESS){
      //   var mk = new BMap.Marker(r.point);
      //   map.addOverlay(mk);
      //   map.panTo(r.point);
      //   alert('您的位置：'+r.point.lng+','+r.point.lat);
      // }
      // else {
      //   alert('failed'+this.getStatus());
      // }
      // },{enableHighAccuracy: true})
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
  .detail{
    height: 2rem;
    line-height: 2rem;
  }
}
</style>
