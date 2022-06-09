import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
  },
  fastRefresh: {},
  // locale: {
  //   default: 'en-US',
  //   antd: true,
  //   title: true,
  //   baseNavigator: false,
  //   baseSeparator: '-',
  // },
  proxy: {
    '/api': {
      target: 'http://16.162.83.134:8102',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
