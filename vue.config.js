const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  devServer: {
    proxy: {
        '/api': {
            target: 'http://43.156.61.92:8088',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
  },
  publicPath: './'
})
