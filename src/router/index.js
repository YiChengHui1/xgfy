import Vue from 'vue'
import Router from 'vue-router'
import DomesticOutbreak from '@/pages/domestic_outbreak'
import DomesticOutbreakMain from '@/pages/domestic_outbreak/domestic_outbreak_main'
import ForeignEpidemics from '@/pages/foreign_epidemics'
import QueryEpidemicCommunity from '@/pages/query_epidemic_community'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'domestic_outbreak',
      component: DomesticOutbreak,
      redirect: '/domestic_outbreak',
      children: [
        {
          path: '/domestic_outbreak',
          name: 'domestic_outbreak_main',
          component: DomesticOutbreakMain
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
    }
  ]
})
