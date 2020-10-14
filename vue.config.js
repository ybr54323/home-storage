module.exports = {
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    open: false,
    port: 9999,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/url': {
        target: 'http://localhost:7001'
      },
    },
  },
}

