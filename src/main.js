// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// eslint-disable-next-line import/no-duplicates
import { Message, Spin } from 'view-design' // 引入iview-UI
import echarts from 'echarts'
import _ from 'lodash'
// eslint-disable-next-line import/no-duplicates
import ViewUI from 'view-design'
import './assets/css/reset.css'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(ViewUI)

Vue.prototype.$echarts = echarts
Vue.prototype.$Message = Message
Vue.prototype.$Spin = Spin
Vue.prototype._ = _

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
