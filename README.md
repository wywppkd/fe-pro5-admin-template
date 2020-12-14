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
- 全局搜索`TODO`, 确认可能需要修改的地方

## TODO

- 如果是CORS, 根据环境变量修改请求地址