import axios from 'axios';
import { clusterApiUrl } from '@solana/web3.js';

import Notification from '@/components/common/Notification';

const env: any = process.env.WEB3_CONNECT_ENV;

// 请求
const http = axios.create({
  baseURL: clusterApiUrl(env),
  timeout: 20000,
});

// 响应拦截
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    //网络超时异常处理
    if (
      error.code === 'ECONNABORTED' ||
      error.message === 'Network Error' ||
      error.message.includes('timeout')
    ) {
      Notification({
        message:
          'Obtaining Solana chain information timed out. Please try again later',
        type: 'error',
      });
    }
    return error.response;
  },
);

export default function request({
  method = 'get',
  url = clusterApiUrl(env),
  data = {},
  params = {},
}) {
  return http({
    method,
    url,
    data,
    params,
  });
}
