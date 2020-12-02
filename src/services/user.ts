// import { request } from 'umi';

// export async function query() {
//   return request<API.CurrentUser[]>('/api/users');
// }

// export async function queryCurrent() {
//   return request<API.CurrentUser>('/api/currentUser');
// }

// export async function queryNotices(): Promise<any> {
//   return request<{ data: API.NoticeIconData[] }>('/api/notices');
// }

import request from '@/utils/request';

export async function query() {
  return request.get({
    url: '/api/users',
  });
}

export async function queryCurrent() {
  return request.get({
    url: '/api/currentUser',
  });
}

export async function queryNotices(): Promise<any> {
  return request.get({
    url: '/api/notices',
  });
}
