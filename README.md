给你解决了那个严重的bug

# day01
## 1. 项目开发准备
    项目描述
    技术选型
    API接口

## 2. 开启项目开发
    使用脚手架创建项目
    安装所有依赖/指定依赖
    开发环境运行
    生产环境打包与发布

## 3. 搭建项目整体界面结构
    stylus的理解和使用
        结构化, 变量, 函数/minxin(混合)
    vue-router的理解和使用
        $router: 路由器对象, 包含一些操作路由的功能函数, 来实现编程式导航(跳转路由)
        $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params
    项目路由拆分
    底部导航组件: FooterGuide
    导航路由组件: Msite/Search/Order/Profile

## 4. 抽取组件
    头部组件: HeaderTop, 通过slot来实现组件通信标签结构
    商家列表组件: ShopList
    
## 5. 登陆路由组件
     静态组件
     FooterGuide的显示/隐藏: 通过路由的meta

## 6. 接口相关
    运行后台项目(启动mongodb服务), 
    使用postman测试后台接口, 如果不一致, 修改接口文档
	封装ajax: 
		promise+axios封装ajax请求的函数
		封装每个接口对应的请求函数(能根据接口定义ajax请求函数)
		解决ajax的跨越域问题: 配置代理, 对代理的理解

## 7. 异步显示数据
    封装ajax: 
        promise+axios封装ajax请求的函数
        封装每个接口对应的请求函数(能根据接口定义ajax请求函数)
        解决ajax的跨越域问题: 配置代理, 对代理的理解
    vuex编码
        创建所有相关的模块: store/index|state|mutations|actions|getters|mutation-types
        设计state: 从后台获取的数据
        实现actions: 
            定义异步action: async/await
            流程:　发ajax获取数据, commit给mutation
        实现mutations: 给状态赋值
        实现index: 创建store对象
        main.js: 配置store
    组件异步显示数据
        在mounted()通过$store.dispatch('actionName')来异步获取后台数据到state中
        mapState(['xxx'])读取state中数据到组件中
        在模板中显示xxx的数据
        
# day02

## 1. 异步显示分类轮播
    通过vuex获取categorys数组(发请求, 读取)
    对数据进行整合计算(一维变为特定的二维数组)
    使用Swiper显示轮播, 如何在界面更新之后创建Swiper对象?
        1). 使用watch+$nextTick()
        2). 使用回调+$nextTick()	
    使用svg图片实现loading的效果  
## 2. Star组件
    创建组件, 设计组件的props
    使用组件标签, 并传入相应的标签属性
    完成组件编码
    
## 3. 登陆/注册功能
### 1. 界面效果
    1). 切换登陆方式: loginWay
    2). 手机号验证: right_phone + isRightPhone计算属性
    3). 倒计时效果: computeTime + setInterval()
    4). 密码显示/隐藏的切换: isShowPwd + transition
    
### 2. 前后台交互功能
    1). 一次性图形验证码: 
        通过<img src="url">请求后台获取验证码图片显示
        点击回调中更新img的src, 并携带时间戳参数, 更新验证码
    2). 发送短信验证码
        使用第三方短信平台接口
        请求发送验证码短信
        使用mint-ui实现对不同结果的不同提示效果
    3). 短信登陆/注册
    4). 密码登陆/注册
    5). 前台表单验证
        表单前台验证, 如果不通过, 提示
        发送ajax请求, 得到返回的结果
        根据结果的标识(code)来判断登陆请求是否成功
            1: 不成功, 显示提示
            0. 成功, 保存用户信息, 返回到个人中心
    6). 自动登陆
        要App初始化过程中发请求获取user信息, 并保存到state
    7). 退出登陆
        请求退出登陆的接口, 重置state中的user

# day03
## 1. 搭建商家整体界面
    1). 拆分界面路由
    2). 路由的定义/配置|使用

## 2. 模拟(mock)数据/接口
    1). 前后台分离的理解
    2). mockjs的理解和使用
    3). json数据设计的理解  

# day04
## 1. ShopHeader组件
    1). 异步显示数据效果的编码流程
        ajax
          ajax请求函数
          接口请求函数
        vuex
          state
          mutation-types
          actions
          mutations
        组件
          dispatch(): 异步获取后台数据到vuex的state
          mapState(): 从vuex的state中读取对应的数据
          模板中显示
    2). 初始显示异常
        情况: Cannot read property 'xxx' of undefined"
          原因: 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
          解决: 使用v-if指令
    3). vue transition动画
    
## 2. ShopGoods组件
    1). 动态展现列表数据
    2). 基本滑动:
        使用better-scroll
        创建BScroll对象的时机
          watch + $nextTick()
          自定义callback + $nextTick
        better-scroll禁用了原生的dom事件, 使用的是自定义事件
        绑定监听: scroll/scrollEnd
        滚动监听的类型: probeType
        列表滑动的2种类型
            手指触摸
            惯性/编码
    3). 滑动右侧列表, 左侧会同步更新当前分类
        1). 设计一个计算属性: currentIndex代表当前分类的下标
        2). 相关数据
          滚动的y坐标: scrollY---> 给右侧列表绑定一个滚动的监听
          右侧分类<li>的top数组: tops-->列表第一次显示之后统计
        3). 计算的逻辑
           scrollY>=top && scrollY<nextTop
    4). 点击左侧分类项, 右侧列表滑动到对应位置
        1). 绑定点击监听
        2). 通过rightScroll滚动到对应的位置
        3). 立即更新scrollY
    5). 问题: 如何保证当前分类可见?
        在currentIndex变化时, 使左侧列表滑动到对应的li

# day05
## 1. CartControl组件
    1). 问题: 更新状态数据, 对应的界面不变化
        原因: 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
        解决: 
            Vue.set(obj, 'xxx', value)才有数据绑定
            this.$set(obj, 'xxx', value)才有数据绑定

## 2. ShopCart组件
    1). 使用vuex管理购物项数据: cartFoods
      count增加为1: 将food添加到cartFoods中
      count减少为0, 将food从cartFoods中删除
    2). 解决几个功能性bug
        a. 删除所有购物项, 购物车列表还打开着: 显示条件-->listShow----isShow/cartFoodCount
        b. 添加一个购物项, 购物车列表自动打开: 当cartFoodCount为0, 设置isShow=false
        c. 购物车列表不能滑动: 创建BScroll对象
        d. 购物车列表中点一次添加, 会增加多次
            原因: 同一个列表, 创建了多个scroll对象
            解决: 只创建一个scroll对象(单例对象)
                1). 创建之前, 判断对象不存在
                2). 创建之后, 保存对象
        e. 打开时, 可能没有滚动
             scroll.refresh()

## 3. Food组件
    1). 父子组件:
        子组件调用父组件的方法: 通过props将方法传递给子组件
        父组件调用子组件的方法: 通过ref找到子组件标签对象
     2). 事件冒泡的问题?
        @click.stop='xxx'

## 4. ShopRatings组件
    1). 使用vue的自定义事件实现: 子组件向父组件通信
        绑定事件监听: @eventName = 'callback'
        触发/分发事件: this.$emit('eventName', data)
    2). 使用计算属性对列表进行过滤显示
    3). 自定义列表过滤的计算逻辑
    4). 自定义日期过滤器

## 5. 路由导航卫士
    1). 作用:
        a. 监视路由跳转
        b. 控制路由跳转
    2). 应用
        a. 在跳转到界面前, 进行用户权限检查限制(如是否已登陆)
        b. 在界面离开前, 做收尾工作
    3). 常用的卫士回调函数:
        a. 全局前置卫士: beforeEach()
        b. 组件进入卫士: beforeRouteEnter() // 不能直接使用this
        c. 组件离开卫士: beforeRouteLeave()
        
## 6. ShopInfo组件
    1). 通过原生DOM操作元素样式
    2). 解决在当前路由上刷新异常的bug

## 7. 项目优化
    1). 缓存路由组件: <keep-alive>
    2). 路由懒加载: const Home = () => import('./Home.vue')
    3). 图片懒加载: vue-lazyload
    
## 需求
### 1. 应用中一些界面必须是用户登陆后才能显示, 否则自动跳转到登陆界面
### 2. 应用中某个界面必须是未登陆才能显示, 否则自动跳转到个人中心界面
### 3. 应用中某个界面在离开后自动停止当前的定时工作