## 接口错误处理

- status 非 2xx: notification 错误提示
- status 2xx, success 为 false 时: message 错误提示
- 请求初始化时出错或者没有响应返回的异常: notification 提示网络异常
