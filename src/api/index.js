/*
包含n个接口请求函数的模块
 */
import ajax from './ajax'

const BASE = '/api'  // 开发
// const BASE = '' // 生产

// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (geohash) => ajax(`${BASE}/position/${geohash}`)

// 2、获取食品分类列表
export const reqCategorys = () => ajax(BASE+'/index_category')

// 3. 根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE+'/shops', {latitude, longitude})

/**
 * 账号密码登录
 */
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE+'/login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')

/**
 * 获取短信验证码
 */
export const reqSendCode = phone => ajax(BASE+'/sendcode', {phone})

/**
 * 手机号验证码登录
 */
export const reqMsgLogin = (phone, code) => ajax(BASE+'/login_sms', {phone, code}, 'POST')

/**
 * 获取用户信息(根据会话)
 */
export const reqUser = () => ajax(BASE+'/userinfo')

/*
退出登陆
 */
export const reqLogout = () => ajax(BASE+'/logout')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')