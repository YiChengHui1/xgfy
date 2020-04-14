import Vue from 'vue'
import Router from 'vue-router'
import DomesticOutbreak from '@/pages/domestic_outbreak'
import DomesticOutbreakContainer from '@/pages/domestic_outbreak/domestic_outbreak_container'
import DomesticOutbreakMain from '@/pages/domestic_outbreak/domestic_outbreak_china'
import ForeignEpidemics from '@/pages/foreign_epidemics'
import QueryEpidemicCommunity from '@/pages/query_epidemic_community'
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
    // {
    //   path: '/domestic_outbreak',
    //   name: 'domestic_outbreak_main',
    //   component: DomesticOutbreakMain,
    //   children: [
    //     {
    //       path: '/domestic_outbreak/province',
    //       name: 'province',
    //       component: DomesticOutbreakProvice
    //     }
    //   ]
    // },
    {
      path: '/foreign_epidemics',
      name: 'foreign_epidemics',
      component: ForeignEpidemics
    },
    {
      path: '/query_epidemic_community',
      name: 'query_epidemic_community',
      component: QueryEpidemicCommunity
    }
  ]
})
