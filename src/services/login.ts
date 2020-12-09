// import { request } from 'umi';

// export interface LoginParamsType {
//   username: string;
//   password: string;
//   mobile: string;
//   captcha: string;
//   type: string;
// }

// export async function accountLogin(params: LoginParamsType) {
//   return request<API.LoginStateType>('/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }

// export async function getFakeCaptcha(mobile: string) {
//   return request(`/api/login/captcha?mobile=${mobile}`);
// }

// export async function outLogin() {
//   return request('/api/login/outLogin');
// }
import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
}

/** 登录 */
export async function accountLogin(data: LoginParamsType): Promise<API.BaseType<API.LoginResType>> {
  return request.post({
    url: '/api/user/login',
    data,
  });
}

/** 退出登录 */
export async function outLogin() {
  return request.post({ url: '/api/user/logout' });
}
