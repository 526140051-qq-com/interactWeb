const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('base', resolve('src/base'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('stylus', resolve('src/common/stylus'))

    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 30000
        return options
      })
  }
}
