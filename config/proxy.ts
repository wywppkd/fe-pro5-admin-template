/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'http://rap2api.taobao.org/app/mock/230933',
      // target: 'https://crm.huodong.hetaobiancheng.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // 去掉接口路径的 /api 前缀
    },
  },
  pre: {
    '/api/': {
      target: 'http://rap2api.taobao.org/app/mock/230933',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
