module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 去除生产环境的 console
      // vue-cli（当前版本4.3.1）内置了terser-webpack-plugin 直接使用即可
      // eslint-disable-next-line @typescript-eslint/camelcase
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  },
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
