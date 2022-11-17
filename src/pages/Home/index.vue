<template>
  <div>
    <!-- 使用三级联动全局组件TypeNav（全局组件，已经在main.js中注册了） -->
    <TypeNav/>
    <ListContanier/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- Floor组件的数据是父组件给的 -->
    <Floor v-for="(floor,index) in floorsList" :key="floor.id" :floor="floor" />
    <Brand/>
  </div>
</template>

<script>
  //引入组件
  import ListContanier from '@/pages/Home/ListContainer'
  import Recommend from '@/pages/Home/Recommend'
  import Rank from '@/pages/Home/Rank'
  import Like from '@/pages/Home/Like'
  import Floor from '@/pages/Home/Floor'
  import Brand from '@/pages/Home/Brand'
  //引入mapState
  import { mapState } from 'vuex'
  export default {
      name:'Home',
      components:{ListContanier,Recommend,Rank,Like,Floor,Brand},
      mounted(){
        //派发action getFloorsList，请求floorsList数据
        this.$store.dispatch('getFloorsList')
      },
      computed:{
        ...mapState({
          floorsList:(state)=>state.home.floorsList
        })
      }
  }
</script>
