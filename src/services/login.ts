// import { request } from 'umi';

// export interface LoginParamsType {
//   username: string;
//   password: string;
//   mobile: string;
//   captcha: string;
//   type: string;
// }

// export async function fakeAccountLogin(params: LoginParamsType) {
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
  mobile: string;
  captcha: string;
  type: string;
}

export async function fakeAccountLogin(data: LoginParamsType) {
  return request.post({
    url: '/api/login/account',
    data,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request.get({
    url: '/api/login/captcha',
    data: {
      mobile,
    },
  });
}

export async function outLogin() {
  return request.get({ url: '/api/login/outLogin' });
}
