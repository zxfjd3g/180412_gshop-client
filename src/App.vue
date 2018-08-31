<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  export default {

    mounted () {
      // 分发给action发ajax获取address数据
      this.$store.dispatch('getAddress')
      // 分发给action发ajax获取user
      this.$store.dispatch('getUser')
    },

    components: {
      FooterGuide
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
</style>