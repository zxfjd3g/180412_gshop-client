/*
包含n个用于直接更新state的函数的对象模块
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREATE_FOOD_COUNT,
  DECREATE_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types'

export default {

  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },

  [RECEIVE_CATEGORYS](state, {categorys}) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },

  [RECEIVE_USER](state, {user}) {
    state.user = user
  },
  [RESET_USER](state) {
    state.user = {}
  },

  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [INCREATE_FOOD_COUNT](state, {food}) {
    if(food.count) {
      food.count++
    } else {
      // 给food添加一个属性: count=1
      // food.count = 1
      Vue.set( food, 'count', 1)
      // 添加到cartFoods中
      state.cartFoods.push(food)
    }
  },
  [DECREATE_FOOD_COUNT](state, {food}) {

    if(food.count) { // 只有count有值时才减1
      food.count--
      // 当数量减少为0时, 从cartFoods中删除此food
      if(food.count===0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  [CLEAR_CART](state) {

    // 将cartFoods中所有food的count设置为0
    state.cartFoods.forEach(food => food.count = 0)

    state.cartFoods = []
  },
}