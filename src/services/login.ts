import request from '@/utils/request';

/** 登录 */
export async function accountLogin(
  data: API.LoginParamsType,
): Promise<API.BaseType<API.LoginResType>> {
  return request.post({
    url: '/api/user/login',
    data,
  });
}

/** 退出登录 */
export async function outLogin() {
  return request.post({ url: '/api/user/logout' });
}
