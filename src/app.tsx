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
  // 进入应用, 判断是非登录页, 则获取用户信息
  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    console.log('🚀 ~ file: app.tsx ~ line 39 ~ getInitialState ~ currentUser', currentUser);
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

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
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

export const request: RequestConfig = {
  prefix: '/api',
  errorHandler,
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
  // 响应拦截器
  responseInterceptors: [
    async (response) => {
      const res = await response.clone().json();
      if (!res.success) {
        // const errmsg = res.errmsg || res.errMsg || '未知的业务处理错误';
        // message.error(`${errmsg}`);
        const errcode = res.errcode || res.errCode;
        // 需要重新登录的错误码
        if (errcode === 10110002) {
          removeToken();
          message.error('你的登录已失效, 请重新登录');
          history.push('/user/login');
          // TODO 登录失效: 删除token 删除用户信息, 跳转登录页
        }
      }
      return response;
    },
  ],
};
