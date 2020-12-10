import request from '@/utils/request';

export async function queryCurrent(): Promise<API.BaseType<API.UserInfoType>> {
  return request.get({
    url: '/user/getInfo',
  });
}
