import request from '@/utils/request';
import { MyListParamsType, MyListType } from './data';

/** 获取我的列表 */
export function getMyList(data: MyListParamsType): Promise<API.BasePageType<MyListType[]>> {
  return request.get({
    url: '/api/my/list2',
    data,
  });
}
