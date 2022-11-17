//当前这个模块：API进行统一管理

//引入封装好的axios
import requests from "./requests"   //TypeNav分类内容的请求数据
import mockRequests from "./mockRequests"   //Banner轮播图、Floor楼层的请求数据



export const reqCategoryList = ()=>{
    //发请求:axios发请求，返回结果Promise对象
    return requests({   //requests是二次封装了的axios
        //三级联动接口
        //api/product/getBaseCategoryList get 无参数
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

export const reqBannersList = ()=>{
    return mockRequests({   //mockRequests封装了mock模拟的请求
        url:'/banners',    //请求路径   注意：不用写成url:'/mock/banners' 因为mockRequests配置了基础路径了，会自动给你加上
        method:'get'
    })
}

export const reqFloorsList = ()=>{
    return mockRequests({   //mockRequests封装了mock模拟的请求
        url:'/floors',    //请求路径  
        method:'get'
    })
}

//获取搜索模块的数据  地址：/api/list   请求方式：post  参数：需要带参数
//要带参数
export const reqSearchInfo = (params)=>{
    return requests({
        url:'/list',
        method:'post',
        data:params
    })
}