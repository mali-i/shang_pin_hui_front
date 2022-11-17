<template>
    <!--banner轮播-->
    <div class="swiper-container" id="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel,index) in bannersList" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
//引入Swiper的包
import Swiper from 'swiper'
//引入swiper样式
import 'swiper/css/swiper.css'
export default {
    name:'Carousel',
    props:['bannersList'],
    watch:{
        bannersList:{
            immediate:true,  //立即监听
            handler(){
                //nextTick：在下次DOM更新 循环结束之后执行延迟回调。在修改数据之后，立即使用这个方法，获取更新后的DOM。
                this.$nextTick(()=>{
                    //当你执行这个毁掉的时候，能够保证服务器数据回来了。v-for一定已经执行完毕。轮播图的结构一定有了。
                    //创建Swiper实例
                    // console.log('创建Swiper实例')
                    // console.log(this.bannersList)
                    var mySwiper = new Swiper ('.swiper-container', {
                        // direction: 'vertical', // 垂直切换选项
                        loop: true, // 循环模式选项                    
                        // 如果需要分页器
                        pagination: {
                        el: '.swiper-pagination',
                        clickable:true   //分页器小球可以点击切换
                        },                    
                        // 如果需要前进后退按钮
                        navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        },                    
                        // 如果需要滚动条
                        scrollbar: {
                        el: '.swiper-scrollbar',
                        },
                    }) 
                })

            }
        }
    }
}
</script>

<style>

</style>