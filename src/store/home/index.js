import {reqCategoryList,reqBannersList,reqFloorsList} from "@/api"

//home模块的小仓库
const state = {
    //state中数据默认初始值别瞎写。服务器返回的是对象就写对象行，服务器返回数组就写数组形式。
    //宗旨根据接口返回值进行初始化。
   categoryList:[],
   //轮播图的数据
   bannersList:[],
   //楼层floor的数据
   floorsList:[]

}

//action|用户处理派发action的地方，可以书写异步语句、业务逻辑的地方
const actions = {
    //通过api里的接口函数调用。向服务器发请求，获取服务器的数据
    async categoryList(context,value){        
        // let result = reqCategoryList()  
        //reqCategoryList()返回的是Promise，所以用await + async配合使用
        //以拿到Promise的数据
        let result = await reqCategoryList()       
        //解构
        if(result.code == 200){
            context.commit('CATEGORYLIST',result.data.slice(0,16))
        }        
    },

    //要来请求home组件中的ListContainer的轮播图的数据
    async getBannersList(context){  //getBannersList是派发的action
        // console.log('home小仓库中，actions getBannersList:收到！马上处理请求，提交mutation')
        let result = await reqBannersList()
        // console.log(result)        
        if(result.code == 200){
            context.commit('GETBANNERLIST',result.data)
        }  
    },
    //要来请求home组件中的Floor组件的floorsList的数据
    async getFloorsList(context){  //getFloorsList是派发的action
        // console.log('home小仓库中，actions getFloorsList:收到！马上处理请求，提交mutation')
        let result = await reqFloorsList()     
        if(result.code == 200){
            context.commit('GETFLOORSLIST',result.data)
        }  
    }
}
//mutations|mutations是唯一修改state的地方
const mutations = {
    CATEGORYLIST(state,value){
        // console.log('我是home的mutations,我接收到的数据是：',value)
        state.categoryList = value
    },
    GETBANNERLIST(state,value){
        // console.log('home小仓库中，mutation GETBANNERLIST:收到！马上修改state中bannersList数据')
        state.bannersList = value
    },
    GETFLOORSLIST(state,value){
        // console.log('home小仓库中，mutation GETFLOORSLIST:收到！马上修改state中floorsList数据')
        state.floorsList = value        
    }
}

const getters = {}

export default{
    state,
    actions,
    mutations,
    getters
}
