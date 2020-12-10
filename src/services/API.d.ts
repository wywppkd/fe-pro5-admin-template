declare namespace API {
  /** 接口返回数据的基础结构 */
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
