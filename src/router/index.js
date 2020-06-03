import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 国内疫情
      path: '/',
      name: 'COVID-19',
      component: (resolve) => require(['@/pages/domestic_outbreak/index.vue'], resolve),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: (resolve) => require(['@/pages/domestic_outbreak/domestic_outbreak_container/index.vue'], resolve),
          redirect: '/dashboard/china',
          children: [
            {
              path: '/dashboard/china',
              name: 'china',
              component: (resolve) => require(['@/pages/domestic_outbreak/domestic_outbreak_china/index.vue'], resolve)
            },
            {
              path: '/dashboard/province',
              name: 'province',
              component: (resolve) => require(['@/pages/domestic_outbreak/domestic_outbreak_provice/index.vue'], resolve)
            }]
        }]
    },
    {
      // 国外疫情
      path: '/foreign_epidemics',
      name: 'foreign_epidemics',
      component: (resolve) => require(['@/pages/foreign_epidemics/index.vue'], resolve)
    },
    {
      // 疫情小区查询
      path: '/query_epidemic_community',
      name: 'query_epidemic_community',
      component: (resolve) => require(['@/pages/query_epidemic_community/index.vue'], resolve),
      redirect: '/query_epidemic_community/baidu_map',
      children: [{
        path: '/query_epidemic_community/baidu_map',
        name: 'baidu_map',
        component: (resolve) => require(['@/pages/query_epidemic_community/query_epidemic_community_main/index.vue'], resolve)
      }]
    },
    {
      // 谣言
      path: '/rumor',
      name: 'rumor',
      component: (resolve) => require(['@/pages/outbreak/index.vue'], resolve),
      redirect: '/rumor/list',
      children: [
        {
          // 谣言列表
          path: '/rumor/list',
          name: 'list',
          component: (resolve) => require(['@/pages/outbreak/outbreak_list/index.vue'], resolve)
        },
        {
          // 谣言详细信息
          path: '/rumor/detail',
          name: 'detail',
          component: (resolve) => require(['@/pages/outbreak/outbreak_detail/index.vue'], resolve)
        }
      ]
    },
    {
      path: '/mask',
      name: 'mask',
      component: (resolve) => require(['@/pages/mask_information/index.vue'], resolve),
      redirect: '/mask/info',
      children: [
        {
          path: '/mask/info',
          name: 'info',
          component: (resolve) => require(['@/pages/mask_information/mask_main/index.vue'], resolve)
        }
      ]
    },
    {
      path: '/cityvehicles',
      name: 'cityvehicles',
      component: (resolve) => require(['@/pages/city_vehicles/index.vue'], resolve)
    }
  ]
})
