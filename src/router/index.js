import Vue from 'vue'
import Router from 'vue-router'
import DomesticOutbreak from '@/pages/domestic_outbreak'
import DomesticOutbreakContainer from '@/pages/domestic_outbreak/domestic_outbreak_container'
import DomesticOutbreakMain from '@/pages/domestic_outbreak/domestic_outbreak_china'
import ForeignEpidemics from '@/pages/foreign_epidemics'
import QueryEpidemicCommunity from '@/pages/query_epidemic_community'
import Outbreak from '@/pages/outbreak'
import DomesticOutbreakProvice from '@/pages/domestic_outbreak/domestic_outbreak_provice'

Vue.use(Router)

export default new Router({
  routes: [
    {
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
      path: '/foreign_epidemics',
      name: 'foreign_epidemics',
      component: ForeignEpidemics
    },
    {
      path: '/query_epidemic_community',
      name: 'query_epidemic_community',
      component: QueryEpidemicCommunity
    },
    {
      path: '/outbreak',
      name: 'outbreak',
      component: Outbreak,
      children: [
        {
          path: '/outbreak/detal',
          name: 'detail',
          component: DomesticOutbreakMain
        }
      ]
    }
  ]
})
