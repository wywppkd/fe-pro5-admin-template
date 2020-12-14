# 介绍

- 该项目模板是基于 Ant Design Pro v5 二次开发的
  - 登录鉴权: 登录成功后将 token 存储到 cookie 中, 使用 token 换取当前用户信息(id,name,权限码...), 前端根据 `tokenc + 用户信息` 判断用户已登录
    - 每次页面跳转根据 `token + 用户信息` 确认当前用户为登录状态, 未登录则清除`token + 用户信息`跳登录页
    - 每次请求接口, 统一判断接口响应数据中的 errcode, 如果是 xxx 代表登录过期, 清除`token + 用户信息`跳登录页
    - 涉及代码逻辑: `src/app.tsx`, `src/pages/user/login`, 
  - 权限管理(菜单渲染, 路由控制, 页面展示)
  - umi-request 二次封装
  - 去掉菜单国际化配置

## 相关文档

- Ant Design Pro v5 :https://beta-pro.ant.design/docs/getting-started-cn
- UmiJS@3x: https://umijs.org/zh-CN/docs
- UmiJS@3x 插件: https://umijs.org/zh-CN/plugins/api
- ProComponents 重型组件: https://procomponents.ant.design/components

## umi-request 二次封装

> 针对 `接口异常, 业务处理失败, 没有响应信息` 这三种情况进行了统一的错误处理 `src/app.tsx` 的 `errorHandler`

- http status 非 2xx: notification 错误提示
- http status 2xx, success 为 false: message 错误提示
- 请求初始化时出错或者没有响应返回的异常: notification 提示网络异常

## 准备开发

- 推荐工具: VSCode + Prettier-Code formatter(VSCode插件) -> 保存时自动格式化
- 全局搜索 "TODO", 确认可能需要修改的地方

### 确认实际接口与当前项目接口是否一致

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

- 退出登录 `/api/user/logout`

```js
{
  "errcode": 123,
  "errmsg": "退出登录失败",
  "success": true,
  "data": null
}
```

## 目录

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
│   │   ├── ListTableList
│   │   │   ├── components # 当前页面组件的子组件
│   │   │   │   ├── CreateForm.tsx
│   │   │   │   └── UpdateForm.tsx
│   │   │   ├── data.d.ts # 当前组件的 ts 类型
│   │   │   ├── index.tsx
│   │   │   └── service.ts # 当前组件的接口请求方法
│   │   ├── MyList
│   │   │   ├── data.d.ts
│   │   │   ├── index.tsx
│   │   │   └── service.ts
│   │   ├── Welcome.tsx
│   │   ├── document.ejs # 相当于 index.html
│   │   └── user
│   │       └── login # 登录页面
│   │           ├── index.less
│   │           └── index.tsx
│   ├── services # 公用的接口请求方法
│   │   ├── API.d.ts # 公用的 ts 类型
│   │   ├── login.ts # 登录相关接口
│   │   └── user.ts # 用户信息相关接口
│   ├── typings.d.ts
│   └── utils
│       ├── auth.ts # 操作 token 的方法(默认存储在 cookie 中, 为了实现子域名直接共享登录状态, 可修改为 localStorage)
│       ├── permissionMap.ts # 当前应用涉及的权限码
│       ├── request.ts # 再次封装 umi-reuqest, 暴露 get, post, put...方法
│       ├── utils.less
│       └── utils.ts
└── tsconfig.json
```

## 待完善

- 该模板只考虑了反向代理解决跨域问题, 如果要使用 CORS, 并且想要根据环境变量设置 umi-request 的 prefix, 解决思路 [umi 多环境多份配置](https://umijs.org/zh-CN/docs/config#%E5%A4%9A%E7%8E%AF%E5%A2%83%E5%A4%9A%E4%BB%BD%E9%85%8D%E7%BD%AE)
