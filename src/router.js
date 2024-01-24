import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/rank.vue')
    },
    {
      path: '/mint',
      name: 'mint',
      component: () => import('./views/mint.vue')
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import('./views/rank.vue')
    },

  ]
})


export default router