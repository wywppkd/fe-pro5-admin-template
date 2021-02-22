import { history } from 'umi';

/** 跳转登录页面 */
export default () => {
  // TODO: SSO 登录
  // const { href, origin } = window.location;
  // if (/xxx/.test(href)) {
  //   // 跳转门户统一的登录入口页
  //   window.location.replace(`${origin}/portal/login`);
  //   return;
  // }

  // 跳转当前系统的登录页
  history.replace('/user/login');
};
