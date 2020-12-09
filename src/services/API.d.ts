declare namespace API {
  // export interface CurrentUser {
  //   avatar?: string;
  //   name?: string;
  //   title?: string;
  //   group?: string;
  //   signature?: string;
  //   tags?: {
  //     key: string;
  //     label: string;
  //   }[];
  //   userid?: string;
  //   access?: 'user' | 'guest' | 'admin';
  //   unreadCount?: number;
  // }

  // export interface LoginStateType {
  //   status?: 'ok' | 'error';
  //   type?: string;
  // }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }

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
