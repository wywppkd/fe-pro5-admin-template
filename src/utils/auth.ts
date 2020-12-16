import Cookies from 'js-cookie';

/** 保存token值的key名称 */
const TokenKey = 'token';

/** 读取token */
export function getToken() {
  return Cookies.get(TokenKey);
}

/** 设置token */
export function setToken(token: string) {
  let paramsCookie = {};
  if (window.location.href.includes('hetaobiancheng')) {
    paramsCookie = { domain: '.hetaobiancheng.com', expires: 7 };
  }
  return Cookies.set(TokenKey, token, paramsCookie);
}

/** 删除token */
export function removeToken() {
  let paramsCookie = {};
  if (window.location.href.includes('hetaobiancheng')) {
    paramsCookie = { domain: '.hetaobiancheng.com' };
  }
  return Cookies.remove(TokenKey, paramsCookie);
}
