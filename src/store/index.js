import Vue from 'vue'
import Vuex from 'vuex'
import moduleProvince from './modules/province_name'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    moduleProvince
  }
})
export default store
