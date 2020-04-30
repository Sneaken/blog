module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 10240;
        return options;
      });
  },
};
