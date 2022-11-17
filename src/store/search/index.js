import { reqSearchInfo } from "@/api"

//search的小仓库
const state = {
    searchInfoList:{}
}

const mutations = {
    GETSEARCHINFOLIST(state,value){
        state.searchInfoList = value
        // console.log(state.searchInfoList)
    }
}

const actions = {
    async getSearchInfoList(context,params={}){ 
        //当前这个reqSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户派发actions的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqSearchInfo(params)
        // console.log(result.code)
        if(result.code == 200){
            // console.log(result.data)
            context.commit('GETSEARCHINFOLIST',result.data)
        }
    }
}

//计算属性
//项目当中getters主要的作业是：简化仓库中的数据（为简化数据而生）
//可以把我们将来在组件当中需要用的数据简化一下，这样将来组件在获取数据的时候就方便 
const getters = {
    goodsList(state){   //形参：当前仓库中的state
        return state.searchInfoList.goodsList || []   //注意加入服务器的数据没有回来，searchInfoList是空对象，这样点儿就是undefind，会报错
        //所以计算属性的属性值至少给人家来一个数组
    },
    trademarkList(state){
        return state.searchInfoList.trademarkList
    },
    attrsList(state){
        return state.searchInfoList.attrsList
    }
}

export default{
    state,
    actions,
    mutations,
    getters
}
