const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.PUBLIC_PATH,
  lintOnSave: false,
  devServer: {
    port: process.env.VUE_APP_PORT,
    open: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_TARGET_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
