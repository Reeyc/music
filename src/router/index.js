import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/recommend'
  }, {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/components/Recommend/Recommend')
  }, {
    path: '/rank',
    name: 'rank',
    component: () => import('@/components/Rank/Rank')
  }, {
    path: '/singer',
    name: 'singer',
    component: () => import('@/components/Singer/Singer')
  }, {
    path: '/search',
    name: 'search',
    component: () => import('@/components/Search/Search')
  }, ]
})
