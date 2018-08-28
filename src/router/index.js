/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'


Vue.use(VueRouter)

export default new VueRouter({
  // 应用中所有路由
  routes: [
    {
      path: '/msite',
      component: MSite,
      meta: {
        showFooter: true  // 标识NavFooter组件是否显示
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true  // 标识NavFooter组件是否显示
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true  // 标识NavFooter组件是否显示
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true  // 标识NavFooter组件是否显示
      }
    },

    {
      path: '/login',
      component: Login
    },

    {
      path: '/',
      redirect: '/msite'
    }
  ]
})