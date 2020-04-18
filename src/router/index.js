import Vue from 'vue'
import Router from 'vue-router'
import DomesticOutbreak from '@/pages/domestic_outbreak'
import DomesticOutbreakContainer from '@/pages/domestic_outbreak/domestic_outbreak_container'
import DomesticOutbreakMain from '@/pages/domestic_outbreak/domestic_outbreak_china'
import ForeignEpidemics from '@/pages/foreign_epidemics'
import QueryEpidemicCommunity from '@/pages/query_epidemic_community'
import Rumor from '@/pages/outbreak'
import RumorList from '@/pages/outbreak/outbreak_list'
import RumorDetail from '@/pages/outbreak/outbreak_detail'
import DomesticOutbreakProvice from '@/pages/domestic_outbreak/domestic_outbreak_provice'
import MaskInfo from '@/pages/mask_information'
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 国内疫情
      path: '/',
      name: 'COVID-19',
      component: DomesticOutbreak,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DomesticOutbreakContainer,
          redirect: '/dashboard/china',
          children: [
            {
              path: '/dashboard/china',
              name: 'china',
              component: DomesticOutbreakMain
            },
            {
              path: '/dashboard/province',
              name: 'province',
              component: DomesticOutbreakProvice
            }]
        }]
    },
    {
      // 国外疫情
      path: '/foreign_epidemics',
      name: 'foreign_epidemics',
      component: ForeignEpidemics
    },
    {
      // 疫情小区查询
      path: '/query_epidemic_community',
      name: 'query_epidemic_community',
      component: QueryEpidemicCommunity
    },
    {
      // 谣言
      path: '/rumor',
      name: 'rumor',
      component: Rumor,
      redirect: '/rumor/list',
      children: [
        {
          // 谣言列表
          path: '/rumor/list',
          name: 'list',
          component: RumorList
        },
        {
          // 谣言详细信息
          path: '/rumor/detail',
          name: 'detail',
          component: RumorDetail
        }
      ]
    }, {
      path: '/mask',
      name: 'mask',
      component: MaskInfo
    }
  ]
})
