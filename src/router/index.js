import Vue from 'vue'
import Router from 'vue-router'
import CinemaSystem from '@/components/CinemaSystem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CinemaSystem',
      component: CinemaSystem
    },
  ]
})
