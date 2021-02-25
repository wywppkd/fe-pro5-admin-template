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
   * 是否跳过 res.errcode !== 0 时的统一错误处理(errorHandler)
   * 默认值 false
   */
  skipErrorHandler?: boolean;
  /**
   * 请求参数
   */
  data?: any;
  /** 如何解析返回类型, 如: 下载文件设置为 blob, 即可通过 file-saver 下载该文件 */
  responseType?: 'blob' | 'json' | 'text' | 'arrayBuffer' | 'formData' | undefined;
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
      responseType: option.responseType,
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
