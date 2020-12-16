import { request } from 'umi';

/**
 * 约束request入参
 */
type RequestOption = {
  /**
   * 请求路径
   */
  url: string;
  /**
   * 请求参数
   */
  data?: any;
};

export default {
  get(option: RequestOption): Promise<any> {
    return request(option.url, {
      method: 'get',
      params: option.data,
    });
  },
  post(option: RequestOption): Promise<any> {
    return request(option.url, {
      method: 'post',
      data: option.data,
    });
  },
  delete(option: RequestOption): Promise<any> {
    return request(option.url, {
      method: 'delete',
      data: option.data,
    });
  },
  put(option: RequestOption): Promise<any> {
    return request(option.url, {
      method: 'put',
      data: option.data,
    });
  },
  patch(option: RequestOption): Promise<any> {
    return request(option.url, {
      method: 'patch',
      data: option.data,
    });
  },
};
