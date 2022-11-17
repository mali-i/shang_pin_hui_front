const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint校验
  lintOnSave:false,
  //开启代理服务器
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''}   //接口文档中的请求路径中有/api，所以就不用路径重写了
      }
    }
  }
})
