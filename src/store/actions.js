import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqCategorys,
  reqShops
} from '../api'

export default {

  // 异步获取当前地址信息
  async getAddress ({commit, state}) {
    // 发异步ajax请求
    const {latitude, longitude} = state
    const geohash = `${latitude},${longitude}`
    const result = await reqAddress(geohash)  // {code:0, data: address}
    // 有了结果提交mutation
    const address = result.data
    commit(RECEIVE_ADDRESS, {address})
  },

  // 异步获取食品分类列表
  async getCategorys ({commit}) {
    // 发异步ajax请求
    const result = await reqCategorys()
    // 有了结果提交mutation
    const categorys = result.data
    commit(RECEIVE_CATEGORYS, {categorys})
  },

  // 异步获取商家列表
  async getShops ({commit, state}) {
    // 发异步ajax请求
    const {latitude, longitude} = state
    const result = await reqShops(longitude, latitude)
    // 有了结果提交mutation
    const shops = result.data
    commit(RECEIVE_SHOPS, {shops})
  }
}