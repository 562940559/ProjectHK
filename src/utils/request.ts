import { extend } from 'umi-request';

import Notification from '@/components/common/Notification';
import { getItem } from './storage';

const errorHandler = (error: any) => {
  // 请求成功发送，但服务器返回错误码
  if (error.code) {
    Notification({
      type: 'error',
      message: error.msg || 'Service call exception',
    });
    throw {
      code: error.code,
      msg: error.msg,
    };
  }
  // 请求发送失败
  if (error.response) {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    if (error.response.status === '401') {
      // To Do
    }
    console.log(error.data);
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    console.log(error.message);
  }
  Notification({
    type: 'error',
    message: error.msg || 'Service call exception',
  });

  // 如果throw. 错误将继续抛出.
  throw {
    ...error.data,
    msg: error.message || 'Service call exception',
  };

  // 如果return, 则将值作为返回. 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
  // return {some: 'data'};
};

const request = extend({
  prefix: '/api',
  timeout: 10000,
  errorHandler,
});

// request拦截器
request.interceptors.request.use((url, options) => {
  const token = getItem('token');
  const headers = {
    Authorization: token ? token : '',
  };
  return {
    url,
    options: { ...options, headers },
  };
});

// response拦截器, 处理response
request.interceptors.response.use(async (response) => {
  const { code, msg } = await response.clone().json();
  if (code && code !== '1') {
    throw { code, msg };
  }
  return response;
});

export default request;
