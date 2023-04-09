const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
   publicPath: '/',
  lintOnSave: false,
  devServer:{
    port:8087,
    open:true,
    proxy:{
        '/api':{
            target:'http://127.0.0.1:8088',
            //target:'http://43.156.61.92:8088',
               changeOrigin:true,
                ws:true,
                pathRewrite:{
                    '^/api':''
                }
        }
    }
  }
})
