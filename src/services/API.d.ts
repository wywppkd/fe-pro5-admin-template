declare namespace API {
  /** 响应数据 */
  export type BaseType<T> = {
    /** 业务处理是否成功 */
    success: boolean;
    /** 错误码 */
    errcode: number;
    /** 错误信息 */
    errmsg: string;
    /** 主要业务数据 */
    data: T;
  };

  /** 响应数据(带分页参数) */
  export type BasePageType<T> = BaseType<{
    pageNum: number;
    pageSize: number;
    total: number;
    list: T;
  }>;

  /** 登录请求参数 */
  export type LoginParamsType = {
    username: string;
    password: string;
  };

  /** 登录返回数据 */
  export type LoginResType = {
    token: string;
  };

  /** 用户信息 */
  export type UserInfoType = {
    userInfo: {
      userId: number;
      name: string;
    };
    /** 用户的权限码 */
    permissionCodeList: string[];
  };
}
