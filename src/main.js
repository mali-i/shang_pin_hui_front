import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
//引入轮播图组件---全局组件
import Carousel from '@/components/Carousel'
//引入vuex 大仓库store
import store from '@/store'
//引入mockServer.js---mock数据
import '@/mock/mockServer'
//注册全局组件---第一个参数：全局组件的名字 第二个参数：哪个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)



//关闭生产提示
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,   //注册路由。组件身上将都拥有$route,$router属性。
  store,
  beforeCreate(){
    Vue.prototype.$bus = this //安装全局事件总线
  }
}).$mount('#app')
