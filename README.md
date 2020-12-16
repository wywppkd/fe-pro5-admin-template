# 介绍

- 该项目模板是基于 Ant Design Pro v5 二次开发的

## 1. 相关文档

- Ant Design Pro v5: https://beta-pro.ant.design/docs/getting-started-cn
- UmiJS@3x: https://umijs.org/zh-CN/docs
- UmiJS@3x 插件: https://umijs.org/zh-CN/plugins/api
- ProComponents 重型组件: https://procomponents.ant.design/components

## 2. 在 Ant Design Pro v5 基础上做了哪些事情

- 登录&鉴权
- 权限管理(菜单渲染, 路由控制, 页面元素)
- umi-request 二次封装
- 去掉菜单国际化配置

### 2.1. 登录&鉴权

> 当检测用户未登录或登录失效时, 删除`token + currentUser(用户信息)`, 跳转登录页

- 用户输入账号密码登录成功, 获得 `token`, 将 `token` 存储到 cookie 中: `src/pages/user/login/index.tsx`
  - 之后所有请求的请求头都会带上`Authorization: ${token}`
- 登录成功后, 通过`token`换取用户信息 `currentUser` (id,name,permissionCodeList...), 将信息存储到`initialState`中: `src/pages/user/login/index.tsx`
- 这三种情况下会对用户登录状态进行鉴定:
  - 页面跳转时, 根据`token + currentUser` 判断用户登录状态: `src/app.tsx` 的 `onPageChange`
  - 请求接口时, 根据接口响应数据`success + errcode` 判断登录是否过期: `src/app.tsx` 的 `errorHandler`
  - 刷新页面时(或直接进入系统非登录页), 通过 `token` 换取用户信息, 如果失败则表示登录过期: `src/app.tsx` 的 `fetchUserInfo`

### 2.2. 权限管理(菜单渲染, 路由控制, 页面元素)

- 系统权限码: `src/utils/permissionMap.ts`
- 从用户信息 `currentUser` 中拿到当前用户的权限码 `permissionCodeList` 与系统权限码比对, 筛选出当前用户的权限: `src/access.ts`
- 使用权限码控制菜单,路由,页面元素, 见官方文档:
  - https://beta-pro.ant.design/docs/authority-management-cn
  - https://umijs.org/zh-CN/plugins/plugin-access

### 2.3. umi-request 二次封装

- 统一设置`Authorization`: `src/app.tsx` 的 `requestInterceptors`
- 错误异常统一处理: `src/app.tsx` 的 `errorHandler`
  - http status 非 2xx: notification 错误提示
  - http status 2xx, success 为 false: message 错误提示
  - 请求初始化时出错或者没有响应返回的异常: notification 提示网络异常
- 封装`umi-request`请求方法, 暴露`get,post,put...`方法, 方便使用: `src/utils/request.ts`

## 3. 快速开始

```bash
$ npm i
$ npm start # 本地启动
$ npm run build # 生产打包
```

- 推荐工具: VSCode + Prettier-Code formatter(VSCode 插件) -> 保存时自动格式化
- 全局搜索 "TODO", 确认可能需要修改的地方

### 3.1. 确认实际接口与当前项目接口是否一致

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
  "errcode": 119,// 错误码
  "errmsg": "账号或密码错误",// 错误信息
  "success": true,// 业务处理成功
  "data": {
    "token": "xxx-xxx-xx"
  }
}
```

- 获取用户信息接口 `/api/user/getInfo`

```js
{
  "errcode": 0,
  "errmsg": "success",
  "success": true,
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
  "errcode": 123,
  "errmsg": "退出登录失败",
  "success": true,
  "data": null
}
```

### 3.2. 开发新页面

1. 新建文件: `src/pages/*`
2. 配置路由: `config/routes.ts`
3. 如果需要权限控制, 添加权限码`src/utils/permissionMap.ts`, 在路由中配置对应的 `access`

### 3.3 定义请求方法和 ts 类型的位置

- 定义公共请求方法 `src/services/xxx.ts`
- 定义页面独有请求方法 `src/pages/xxx/services.ts`
- 定义公共的 ts 类型 `src/services/API.d.ts`
- 定义页面独有的 ts 类型 `src/pages/xxx/data.d.ts`

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
