import request from '@/utils/request';

/** 查询用户信息: 用户ID, 用户名, 权限码... */
export async function queryCurrent(): Promise<API.BaseType<API.UserInfoType>> {
  return request.get({
    url: '/api/user/getInfo',
  });
}
