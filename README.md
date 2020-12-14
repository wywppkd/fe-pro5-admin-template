# 介绍

- 该项目模板是基于 Ant Design Pro v5 二次开发的
- 实现功能: 登录鉴权, 权限管理(菜单渲染, 路由控制, 页面展示), 接口请求错误统一处理
- 去掉了菜单国际化配置

## 相关文档

- Ant Design Pro v5 :https://beta-pro.ant.design/docs/getting-started-cn
- UmiJS@3x: https://umijs.org/zh-CN/docs
- UmiJS@3x 插件: https://umijs.org/zh-CN/plugins/api
- ProComponents 重型组件: https://procomponents.ant.design/components

## 请求接口错误处理

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
  username: string;
  password: string;
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

## 待完善

- 该模板只考虑了反向代理解决跨域问题, 如果要使用 CORS, 并且想要根据环境变量设置 umi-request 的 prefix, 解决思路 [umi 多环境多份配置](https://umijs.org/zh-CN/docs/config#%E5%A4%9A%E7%8E%AF%E5%A2%83%E5%A4%9A%E4%BB%BD%E9%85%8D%E7%BD%AE)