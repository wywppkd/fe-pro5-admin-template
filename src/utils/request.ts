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
   * 是否跳过 umi-request 的错误处理(errorHandler), 是则需要在页面上自行处理
   * 默认值 false
   */
  skipErrorHandler?: boolean;
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
      skipErrorHandler: option.skipErrorHandler,
    });
  },
  post(option: RequestOption): Promise<any> {
    return request(option.url, {
      method: 'post',
      data: option.data,
      skipErrorHandler: option.skipErrorHandler,
    });
  },
  delete(option: RequestOption): Promise<any> {
    return request(option.url, {
      method: 'delete',
      data: option.data,
      skipErrorHandler: option.skipErrorHandler,
    });
  },
  put(option: RequestOption): Promise<any> {
    return request(option.url, {
      method: 'put',
      data: option.data,
      skipErrorHandler: option.skipErrorHandler,
    });
  },
  patch(option: RequestOption): Promise<any> {
    return request(option.url, {
      method: 'patch',
      data: option.data,
      skipErrorHandler: option.skipErrorHandler,
    });
  },
};
