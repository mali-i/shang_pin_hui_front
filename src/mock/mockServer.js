//先引入mockjs模块
import Mock from 'mockjs'
//引入JSON数据
//（JSON数据不需要对外暴露就可以引入。webpack默认对外暴露的有：图片、JSON数据格式）
import banners from './banners.json'
import floors from './floors.json'

//mock数据
//Mock是一个对象，这个对象身上有一个mock方法
//第一个参数：请求地址；第二个参数：请求数据
Mock.mock("/mock/banners",{code:200,data:banners})   //模拟首页大的轮播图的数据
Mock.mock("/mock/floors",{code:200,data:floors})