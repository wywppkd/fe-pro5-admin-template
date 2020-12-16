import request from '@/utils/request';
import { TableListParams, TableListItem } from './data.d';

export async function queryRule(data?: TableListParams) {
  return request.get({
    url: '/api/rule',
    data,
  });
}

// 注意: 以下接口没有定义 mock 数据, 请求时会报错......
export async function removeRule(params: { key: number[] }) {
  return request.post({
    url: '/api/rule',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request.post({
    url: '/api/rule',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request.post({
    url: '/api/rule',
    data: {
      ...params,
      method: 'update',
    },
  });
}
