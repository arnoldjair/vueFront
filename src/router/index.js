import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import User from '@/components/User'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User
    }
  ]
})
