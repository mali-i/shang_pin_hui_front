//引入Vue
import Vue from 'vue'
//引入VueRouter
import VueRouter from 'vue-router'
//使用VueRouter
Vue.use(VueRouter)
//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
//把VueRouter原型对象的push|replace方法，先保存一份
// let originPush = VueRouter.prototype.push
// let originReplace = VueRouter.prototype.replace
//重写push|replace
//第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
//call||apply区别：
//相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//不同点：call与apply传递参数：call传递参数用逗号隔开，apply传递数组
// VueRouter.prototype.push = function(location,resolve,reject){
//     if(resolve && reject){
//         originPush.call(this,location,resolve,reject)
//     }else{
//         originPush.call(this.location,()=>{},()=>{})
//     }
// }
// VueRouter.prototype.replace = function(location,resolve,reject){
//     if(resolve && reject){
//         originReplace.call(this,location,resolve,reject)
//     }else{
//         originReplace.call(this.location,()=>{},()=>{})
//     }
// }

//创建VueRouter实例并暴露出去
export default new VueRouter({
    //配置路由
    routes:[
        {
            path:'/home',
            component:Home,
            meta:{
                show:true //是否显示Footer
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{
                show:false
            }
        },
        {
            path:'/register',
            component:Register,
            meta:{
                show:false
            }
        },
        {
            path:'/search/:paramsKeyword?',
            name:'Search',
            component:Search,
            meta:{
                show:true
            }
        },
        //重定向。让项目跑起来时，用户访问/，立马定位到首页
        {
            path:'*',
            redirect:'/home'
        }
    ]
})