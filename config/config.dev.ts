import { defineConfig } from 'umi';

// UMI_ENV = dev 环境配置
export default defineConfig({
  define: {
    REACT_APP_API_URL: 'http://rap2api.taobao.org/app/mock/230933',
  },
});
