<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container" @mouseenter="mouseEnterShow" @mouseleave="mouseLeaveShow">
            <h2 class="all">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <transition name="sort">
            <div class="sort" v-show="showNav" >
                <!-- 利用事件委派+编程式导航，实现路由的跳转与传递参数 -->
                <div class="all-sort-list2" @click="goSearch">
                    <!-- 一级菜单 -->
                    <div class="item bo" v-for="(c1,index) in categoryList" :key=c1.categoryId>  
                        <h3>
                            <!-- 绑定自定义属性 -->
                            <a 
                            :data-categoryName="c1.categoryName"
                            :data-category1Id="c1.categoryId"
                            >{{c1.categoryName}}</a>   
                        </h3>
                        <!-- 二级菜单 -->
                        <div class="item-list clearfix">
                            <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a 
                                        :data-categoryName="c2.categoryName"
                                        :data-category2Id="c2.categoryId"
                                        >{{c2.categoryName}}</a>
                                    </dt>
                                    <!-- 三级菜单 -->
                                    <dd>
                                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                            <a 
                                            :data-categoryName="c3.categoryName"
                                            :data-category3Id="c3.categoryId"
                                            >{{c3.categoryName}}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        </transition>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name:'TypeNav',
        data(){
            return{
                showNav:true    //是否展开分类菜单
            }
        },
        //组件挂载完毕，可以向服务器发送请求
        mounted() {

            //如果不是home路由组件，将typeNav进行隐藏            
            if(this.$route.path!='/home'){
                this.showNav = false
                // console.log('我是Search组件的TypeNav组件，我挂载完毕') 
                // console.log(this.$route)
            }else{
                // console.log('我是Home组件的TypeNav组件，我挂载完毕') 
                // console.log(this.$route)
            }
        },
        computed:{
            //对象形式
            ...mapState({
                categoryList:(state)=>{
                    return state.home.categoryList
                }
            })
        },
        methods: {
            //路由跳转
            goSearch(event){

                //判断用户点击的是否是a标签（是否有自定义属性）
                //event.target可以获取到当前触发事件的节点，有可能是h3\a\dt\d1\em，但我们需要的是a(带有data-categoryname)
                // console.log(event.target)
                //节点有一个属性dataset属性，可以获取到节点的属性和自定义属性
                // console.log(event.target.dataset)
                //把属性值解构出来（自定义属性浏览器会都把你变为小写的）
                let {categoryname,category1id,category2id,category3id} = event.target.dataset
                //传参！整理一下路由跳转需要的参数  
                // this.$route.push({name:'Search',query:{categoryName:'',category1Id:'',？？？},params:{}})
                //需要①要跳转的路由组件的name，携带的query参数，或者params参数
                let location = {name:'Search'}

                this.$bus.$on('sendParams',(sendParams)=>{
                    location.params = sendParams
                })

                let query = {categoryName:categoryname}
                if(categoryname){ //categoryname不为空，说明有这个自定义属性，说明是我们要的标签
                    //区分一级分类、二级分类、三级分类
                    if(category1id){
                        //一级分类
                        // console.log('用户点击了一级分类，',categoryname)
                        query.category1Id = category1id
                    }else if(category2id){
                        //二级分类
                        // console.log('用户点击了二级分类，',categoryname)
                        query.category2Id = category2id
                    }else if(category3id){
                        //三级分类
                        // console.log('用户点击了三级分类，',categoryname)
                        query.category3Id = category3id
                    } else{
                        alert('你没点准')
                        return
                    } 
                    //现在准备好了query参数，但它俩是分开的俩对象
                    // console.log(location,query)  
                    //所以给location对象，动态地添加上query（键值对）
                    location.query = query
                    location.params = 
                    // console.log(location)  
                    //编程式导航，导航到Search，且携带着需要的参数
                    // console.log(this.$router)
                    this.$router.push(location)     //要跳到的路由是Search          
                    
                }else{
                    alert('你没点准，请点到内容上去')
                }             
            },
            
            //在Search组件中，分类导航和分类内容需要随鼠标的进入离开进行展示和隐藏
            //鼠标进入分类导航时
            mouseEnterShow(){
                //修改showNav为真
                this.showNav = true
            },
            //鼠标离开分类导航时(判断是否是Search组件，Search组件需要在鼠标离开时showNav改为false)
            mouseLeaveShow(){
                if(this.$route.path.indexOf('/search') !== -1){
                    //修改showNav为假
                    this.showNav = false
                }
            }
        },
    }
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                    .item:hover{
                        background: skyblue;
                    }
                }
            }
            //过度动画的样式
            //过度动画开始状态（进入）
            .sort-enter{
                height: 0px;
            }
            //过度动画结束状态（离开）
            .sort-enter-to{
                height: 461px;
            }
            //定义动画事件、速率（动画进行的过程中）
            .sort-enter-active{
                transition:all 0.5s linear 
            }
        }
    }
</style>