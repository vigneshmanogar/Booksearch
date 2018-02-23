import Vue from 'vue'
import Router from 'vue-router'
import Bookapp from '@/components/Bookapp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bookapp',
      component: Bookapp
    }
  ]
})
