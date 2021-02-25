# 介绍

- 该项目模板是基于 Ant Design Pro v5 二次开发的

## 1. 相关文档

- Ant Design Pro v5: https://beta-pro.ant.design/docs/getting-started-cn
- UmiJS@3x: https://umijs.org/zh-CN/docs
- UmiJS@3x 插件: https://umijs.org/zh-CN/plugins/api
- ProComponents 重型组件: https://procomponents.ant.design/components

## 2. 在 Ant Design Pro v5 基础上做了哪些事情

- 登录 & 鉴权
- 权限管理(菜单渲染, 路由控制, 页面元素)
- umi-request 二次封装
- 去掉菜单国际化配置
- moment 全局配置 `src/global.ts`

### 2.1. 登录 & 鉴权

1. 用户输入账号密码登录成功, 接口返回 `token`, 将 `token` 存储到 cookie 中

- 之后所有请求的请求头都会带上`Authorization: ${token}`

1. 进入首页, 通过 `token` 换取用户信息 `currentUser` (id,name,permissionCodeList...), 将信息存储到`initialState`中
1. 之后这三种情况下会对用户登录状态进行鉴定:

- 页面跳转时, 根据`token + currentUser` 判断用户登录状态, 代码位置: `src/app.tsx` 的 `onPageChange`
- 请求接口时, 根据接口响应数据`res.errcode` 判断登录是否过期, 代码位置: `src/app.tsx` 的 `errorHandler`
- 刷新页面时(或直接进入系统非登录页), 通过 `token` 换取用户信息 `currentUser`, 如果失败则表示登录过期, 代码位置: `src/app.tsx` 的 `fetchUserInfo`

1. 当用户退出登录/登录失效时, 删除`token + currentUser(用户信息)`, 跳转登录页

### 2.2. 权限管理(菜单渲染, 路由控制, 页面元素)

- 权限管理的逻辑使用了 pro5 官方提供的方案, 系统涉及的权限码统一放在了 `src/utils/permissionMap.ts`
- pro5 权限管理: https://beta-pro.ant.design/docs/authority-management-cn

### 2.3. umi-request 二次封装

- 统一设置请求头字段 `Authorization`, 代码位置: `src/app.tsx` 的 `requestInterceptors`
- 错误异常统一处理, 代码位置: `src/app.tsx` 的 `errorHandler`

  - http status 非 2xx: notification 错误提示
  - http status 2xx, success 为 false: message 错误提示
  - 请求初始化时出错或者没有响应返回的异常: notification 提示网络异常

- 封装 `umi-request` 请求方法, 暴露`get,post,put...`方法, 方便使用: `src/utils/request.ts`

## 3. 快速开始

- 全局搜索 "TODO", 确认可能需要修改的地方

```bash
$ npm i
$ npm start # 本地启动
$ npm run build # 生产打包
```

### 3.1. 代码格式化

- 编辑器: VSCode
- 编辑器插件: Prettier-Code formatter(VSCode 插件) => 开启自动格式化(配合 `.vscode/settings.json`)
- 编辑器插件: ESLint => 开启 ESLint 规则检测

```bash
# 提交代码前, 执行下面命令自动格式化 ts,js 和 less 文件, ps: 有些格式问题可能需要手动才能修复
$ npm run lint:fix # eslint 修复 & stylelint 修复
```

### 3.2. 确认实际接口与当前项目接口是否一致

> 不一致则根据实际接口修改对应代码

- 登录接口 `/api/user/login`

```js
// 请求参数
{
  username: "admin";
  password: "123456";
}

// 响应数据
{
  "errcode": 0,// 错误码, 0-表示成功, 其他-失败
  "errmsg": "账号或密码错误",// 错误信息
  "data": {
    "token": "xxx-xxx-xx"
  }
}
```

- 获取用户信息接口 `/api/user/getInfo`

```js
{
  "errcode": 0,
  "errmsg": "错误信息...",
  "data": {
    // 权限码
    "permissionCodeList": [
      "index",
      "index_item",
      "table",
      "my_list"
    ],
    // 用户信息
    "userInfo": {
      // 用户ID
      "userId": 30000577,
      // 用户名
      "name": "admin"
    }
  }
}
```

- 退出登录接口 `/api/user/logout`

```js
{
  "errcode": 0,
  "errmsg": "退出登录失败",
  "data": null
}
```

### 3.3. 开发新页面

1. 新建文件: `src/pages/*`
2. 配置路由: `config/routes.ts`
3. 如果需要权限控制: 添加权限码`src/utils/permissionMap.ts`, 在路由中配置对应的 `access`

### 3.4. 定义请求方法和 ts 类型的位置

- 定义公共的请求方法 `src/services/***.ts`
- 定义公共的 ts 类型 `src/services/API.d.ts`

- 定义页面独有的请求方法 `src/pages/***/services.ts`
- 定义页面独有的 ts 类型 `src/pages/***/data.d.ts`

### 3.5. 根据 url 下载文件(图片, pdf, doc...)

```js
import saveFile from '@/utils/saveFile';

// 下载文件
saveFile('文件url', '自定义文件名, 不传则根据 url 后缀读取原文件名');
```

### 3.6. 前端导出 excel

```js
import { export_json_to_excel } from '@/utils/export2Excel';

export_json_to_excel({
  header: ['姓名', '年龄'],
  data: [
    ['张三', 18],
    ['李四', 22],
  ],
});
```

### 3.7. 如何下载文件流

```js
// service.ts: 定义请求方法
import request from '@/utils/request';

export function downLoad() {
  return request.post({
    url: '/xxx',
    skipErrorHandler: true, // 忽略错误码检查
    responseType: 'blob', // 告诉 fetch 如何解析返回的数据(应该是调用了 response.blob())
  });
}

// xxx.tsx: 使用
import { saveAs } from 'file-saver';

downLoad().then((res) => {
  saveAs(res, '文件名.xlsx');
});
```

## 4. 目录

```bash
├── config
│   ├── config.ts # umi 配置文件
│   ├── defaultSettings.ts # 默认配置: 标题, logo, 主题...
│   ├── proxy.ts # 本地开发配置反向代理
│   └── routes.ts # 路由,菜单配置
├── public
│   ├── favicon.ico
│   ├── home_bg.png
│   └── logo.png
├── src
│   ├── access.ts # 返回权限对象
│   ├── app.tsx # 运行时配置: 应用初始数据, layout, umi-request
│   ├── components # 公共组件
│   │   ├── Footer
│   │   │   └── index.tsx
│   │   ├── HeaderDropdown
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   └── RightContent
│   │       ├── AvatarDropdown.tsx
│   │       ├── index.less
│   │       └── index.tsx
│   ├── global.less # 全局样式
│   ├── global.tsx
│   ├── pages # 页面组件
│   │   ├── 404.tsx
│   │   ├── Admin.tsx
│   │   ├── ListTableList # 查询表格页
│   │   │   ├── components # 当前页面组件的子组件
│   │   │   │   ├── CreateForm.tsx
│   │   │   │   └── UpdateForm.tsx
│   │   │   ├── data.d.ts # 当前组件的 ts 类型(公共 ts 类型可以放在 src/services/API.d.ts)
│   │   │   ├── index.tsx # 页面组件
│   │   │   └── service.ts # 当前组件的接口请求方法(公共请求方法可以放在 src/services/xxx.ts)
│   │   ├── MyList
│   │   │   ├── data.d.ts
│   │   │   ├── index.tsx
│   │   │   └── service.ts
│   │   ├── Welcome.tsx # 欢迎页
│   │   ├── document.ejs # 相当于 index.html
│   │   └── user
│   │       └── login # 登录页
│   │           ├── index.less
│   │           └── index.tsx
│   ├── services # 公用的接口请求方法(页面独有请求方法可以放在 src/pages/xxx/services.ts)
│   │   ├── API.d.ts # 公用的 ts 类型(页面独有 ts 类型定义可以放在 src/pages/xxx/data.d.ts)
│   │   ├── login.ts # 登录相关接口
│   │   └── user.ts # 用户信息相关接口
│   ├── typings.d.ts
│   └── utils
│       ├── auth.ts # 管理 token 的方法(为了实现子域名之间共享登录状态默认存储在 cookie 中, 可改为 localStorage)
│       ├── permissionMap.ts # 当前应用涉及的权限码
│       ├── request.ts # 再次封装 umi-reuqest, 暴露 get, post, put...方法
│       ├── sleep.ts # 暂停函数
│       ├── utils.less
│       └── utils.ts
└── tsconfig.json
```

## 5. 待完善

- 如果使用了 CORS 解决跨域问题, 并且想要根据环境变量设置 umi-request 的 prefix, 解决思路 [umi 多环境多份配置](https://umijs.org/zh-CN/docs/config#%E5%A4%9A%E7%8E%AF%E5%A2%83%E5%A4%9A%E4%BB%BD%E9%85%8D%E7%BD%AE)
