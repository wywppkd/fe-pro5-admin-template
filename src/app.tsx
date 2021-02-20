import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings, PageLoading } from '@ant-design/pro-layout';
import { message, notification } from 'antd';
import { history, RequestConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { ResponseError } from 'umi-request';
import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';
import { getToken, removeToken } from './utils/auth';

/**
 * 获取用户信息比较慢的时候会展示一个 loading
 */
export const initialStateConfig = {
  loading: <PageLoading />,
};

// https://umijs.org/zh-CN/plugins/plugin-initial-state
/** getInitialState 会在整个应用最开始时执行 */
export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.UserInfoType;
  fetchUserInfo?: () => Promise<API.UserInfoType | undefined>;
}> {
  /** 获取用户信息 */
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrent();
      return currentUser.data;
    } catch (error) {
      removeToken();
      history.push('/user/login');
    }
    return undefined;
  };
  // 非登录页
  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  // 登录页
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.UserInfoType };
}): BasicLayoutProps & {
  childrenRender?: (dom: JSX.Element) => React.ReactNode;
} => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    // 页面跳转
    onPageChange: async () => {
      const { currentUser } = initialState;
      const { location } = history;
      const token = getToken();
      // 判断登录状态(无token或者无currentUser)
      if ((!token || !currentUser) && location.pathname !== '/user/login') {
        removeToken();
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 统一进行异常处理
 * 什么情况会进入该异常处理: 状态码非2xx | errcode!==0 | 请求没发出去或没有响应信息
 */
const errorHandler = (error: ResponseError) => {
  const { response, data } = error;
  if (response && response.status) {
    // 状态码非 2xx 的响应: 也就是业务处理异常
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (data) {
    // 状态码2xx & errcode!==0: 也就是业务处理失败
    const errmsg = data.errmsg || data.errMsg || '未知的业务处理错误'; // 兼容历史接口: 驼峰 or 全小写
    const errcode = data.errcode || data.errCode || '未知'; // 兼容历史接口: 驼峰 or 全小写
    // TODO: 请确认登录过期的 errcode
    if (errcode === 10110002) {
      // 10110002: 登录过期, token无效等表示需要重新登录
      removeToken();
      message.error('你的登录已失效, 请重新登录');
      history.push('/user/login');
    } else {
      // 其他错误码统一提示
      message.error(`${errmsg}(错误码:${errcode})`);
    }
  } else {
    // 请求发出前出错或没有响应
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

export const request: RequestConfig = {
  errorHandler,
  /**
   * https://umijs.org/zh-CN/plugins/plugin-request
   * 当后端接口不满足 plugin-request 规范的时候你需要通过该配置把后端接口数据转换为该格式
   * 注意: 该配置只是用于错误处理，不会影响最终传递给页面的数据格式。
   */
  errorConfig: {
    adaptor: (resData) => {
      const errcode = typeof resData.errcode === 'number' ? resData.errcode : resData.errCode; // 兼容历史接口: 驼峰 or 全小写
      const errmsg = resData.errmsg || resData.errMsg || '未知的业务处理错误'; // 兼容历史接口: 驼峰 or 全小写
      return {
        ...resData,
        success: errcode === 0, // errcode:0 表示业务处理成功, 后端接口返回的 success 不准确
        errorMessage: errmsg,
      };
    },
  },
  // 请求拦截器: 请求头增加 token
  requestInterceptors: [
    (url, options) => {
      const tmpOptions = options;
      const token = getToken();
      if (token) {
        tmpOptions.headers = { ...options.headers, Authorization: token };
      }
      return {
        options: tmpOptions,
        url,
      };
    },
  ],
};
