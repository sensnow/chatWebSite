const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
   //publicPath: './',
  lintOnSave: false,
  devServer:{
    port:8087,
    open:true,
    proxy:{
        '/api':{
            target:'http://43.156.61.92',
               changeOrigin:true,
                ws:true,
                pathRewrite:{
                    '^/api':''
                }
        }
    }
  }
})
