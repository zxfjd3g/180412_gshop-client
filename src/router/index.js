/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
/*

import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
*/

// code split: 代码分割(单独打包), 需要时才请求加载
const MSite = () => import('../pages/MSite/MSite.vue')
const Order = () => import('../pages/Order/Order.vue')
const Search = () => import('../pages/Search/Search.vue')
const Profile = () => import('../pages/Profile/Profile.vue')

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'

import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

import A from '../pages/test/A.vue'
import B from '../pages/test/B.vue'
import B1 from '../pages/test/B1.vue'
import B2 from '../pages/test/B2.vue'


Vue.use(VueRouter)

const router = new VueRouter({
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
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    },

    {
      path: '/a',
      component: A
    },
    {
      path: '/b',
      component: B,
      children: [
        {
          path: '/b/b1',
          component: B1
        },
        {
          path: '/b/b2',
          component: B2
        },
      ]
    },

    {
      path: '/',
      redirect: '/msite'
    }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  // ### 1. 应用中一些界面必须是用户登陆后才能显示, 否则自动跳转到登陆界面
  if(to.path==='/a' || to.path==='/b') {
    // console.log('-----', Vue.store)
    if(!Vue.store.state.user._id) { // 如果当前还没有登陆
      return next('/login') // 强制跳转到登陆界面
    }
  }
  // 放行
  next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  console.log('afterEach', to, from)
})


export default router