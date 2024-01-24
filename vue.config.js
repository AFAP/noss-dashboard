module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  publicPath: './',
  devServer: {
    port: 8816,
    open: true,
    proxy: {
      '/server-treasure-box': {
        target: 'http://8.217.42.210/noss/',
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  },
}
