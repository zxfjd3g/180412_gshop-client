/*
自定义过滤器
 */
import Vue from 'vue'
// import moment from 'moment'
import format from 'date-fns/format'

Vue.filter('date-format', function (value, format) {
  // return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
  return format(value, format || 'YYYY-MM-DD HH:mm:ss')
})