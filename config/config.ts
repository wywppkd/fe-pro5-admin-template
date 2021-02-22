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
  antd: {
    // dark: true, // 开启暗黑模式
  },
  define: {
    REACT_APP_API_URL: '',
  },
  // dva: {
  //   hmr: true,
  // },
  // 支持 ProLayout 的配置: https://procomponents.ant.design/components/layout#prolayout
  layout: {
    name: '',
    // 是否开启国际化配置(需要配置 plugin-locale 插件): 菜单名, 插件
    locale: true,
    siderWidth: 208,
    menu: {
      locale: false, // 关闭菜单的国际化
    },
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
  // 开启按需加载: 将路由组件单独拆出
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
  // 静态化: 为每个路由输出一个 html 文件
  // exportStatic: {},
  mock: false,
  outputPath: 'dist', // TODO, 输出路径
  // 路由前缀
  base: '/', // TODO, 当网站根路径是 https://www.baidu.com/app/ 时, 设置为 /app/
  // 静态文件路径
  publicPath: '/', // TODO, 当网站根路径是 https://www.baidu.com/app/ 时, 设置为 /app/
});
