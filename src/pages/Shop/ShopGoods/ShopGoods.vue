<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <!--current   currentIndex-->
          <li class="menu-item" v-for="(good, index) in goods"
              :key="index" :class="{current: currentIndex===index}" @click="selectItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <shop-cart/>
    </div>
    <Food ref="food" :food="food"/>
  </div>
</template>
<script>
  /*
1. 滑动右侧列表, 左侧的当前分类变化
2. 点击左侧分类项, 右侧列表滑动到对应位置
3. 如何保证当前分类可见

当前分类的下标: currentIndex
	右侧列表滑动的Y坐标: scrollY-->滑动过程中动态确定(绑定scroll监听)
	右侧所有分类li的top值: tops-->列表初始显示后读取
	计算的逻辑: scrollY>=top && scrollY<nextTop
   */
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  import CartControl from '../../../components/CartControl/CartControl.vue'
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'

  export default {

    data () {
      return {
        scrollY: 0, // 右侧列表滑动的Y坐标
        tops: [], // 侧所有分类li的top值
        food: {}, // 需要显示的food
      }
    },

    mounted () {
      // 利用calback+nextTick()实现在列表数据显示之后才执行
      this.$store.dispatch('getShopGoods', () => { // goods数据已经有了
        this.$nextTick(() => {
          this._initScroll()
          this._initTops()
        })
      })
    },

    computed: {
      ...mapState(['goods']),

      // 当前分类的下标:
      currentIndex () {
        const {scrollY, tops} = this
        // [0, 12, 15, 18]
        // scrollY>=top && scrollY<nextTop    [top, nextTop)

        const index = tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1])

        // 只有当index变化时才滑动
        if(index!==BScroll.index) {
          BScroll.index = index
          this._scrollLeftList(index)
        }

        return index
      }
    },

    methods: {
      // 初始化滚动对象
      _initScroll() {
        // 左侧滚动对象
        this.leftScroll = new BScroll('.menu-wrapper', {
          click: true,
        })
        // 右侧滚动对象
        this.rightScroll = new BScroll('.foods-wrapper', {
          probeType: 1, // 只有当触摸滑动时非实时触发
          click: true, // 分发自定义点击事件
        })

        // 给右侧列表绑定scroll监听
        this.rightScroll.on('scroll', ({x, y}) => {
          console.log('scroll', x, y)
          this.scrollY = Math.abs(y)
        })
        // 给右侧列表绑定scrollEnd监听
        this.rightScroll.on('scrollEnd', ({x, y}) => {
          console.log('scrollEnd', x, y)
          this.scrollY = Math.abs(y)
        })
      },

      // 初始化tops数组
      _initTops () {
        // 根据所有分类li的高度统计生成一个tops
        const tops = []
        let top = 0
        tops.push(top)
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
        Array.from(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })

        // 更新tops状态数据
        this.tops = tops
        console.log(tops)
      },

      // 选择左侧某个分类项--> 右侧列表滑动到对应位置
      selectItem (index) {
        // 得到目标位置的top值
        const top = this.tops[index]

        // 立即更新scrollY值目标坐标值
        this.scrollY = top

        // 平滑滚动到对应位置
        this.rightScroll.scrollTo(0, -top, 300)
      },

      // 滑动左侧列表到指定下标分类处(尽量, 至少保证可见)
      _scrollLeftList (index) {
        if(this.leftScroll) {
          // 得到左侧当前分类的li
          const li = this.$refs.leftUl.children[index]
          // 滑动到li位
          this.leftScroll.scrollToElement(li, 200)
        }
      },

      // 显示指定food
      showFood (food) {
        // 更新food状态
        this.food = food
        // 得到标签(组件)对象, 并调用其方法
        this.$refs.food.toggleShow()
      }
    },

    components: {
      CartControl,
      Food,
      ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 237px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
