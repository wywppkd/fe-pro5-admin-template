// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  // 是否开启打包后文件的 hash 后缀
  hash: true,
  // 开启 antd
  antd: {},
  // dva: {
  //   hmr: true,
  // },
  layout: {
    name: '',
    // 是否开启国际化配置: 如菜单名会从 locales 中查找
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // 国际化配置
  locale: {
    // 默认语言
    default: 'zh-CN',
    // 是否支持 antd 国际化
    antd: true,
    // 是否开启浏览器语言检测: 通过 `navigator.language` 覆盖默认值
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi 配置路由: https://umijs.org/docs/routing
  routes,
  // antd 的主题: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  esbuild: {},
  title: false,
  // 是否忽略 moment 的 locale 文件
  ignoreMomentLocale: true,
  // 反向代理配置
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  history: {
    type: 'browser',
  },
  exportStatic: {},
  mock: false,
});
