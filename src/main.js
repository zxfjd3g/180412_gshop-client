import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  el: '#app',
  /* components: {
    App
  },
  template: '<App/>' */
  render: h => h(App),
  /* render: function (createElement) {
    return createElement(App)   // return '<App/>'
  } */
  router, // 配置路由器
})
