import { clusterApiUrl } from '@solana/web3.js';

import axiosRequest from '@/utils/rpcRequest';
import request from '@/utils/request';

const env: any = process.env.WEB3_CONNECT_ENV;

/**
 * 获取用户非SOL代币余额
 * @param params
 * @returns
 */
export const getOtherTokenBalance = (params: any) =>
  axiosRequest({ url: clusterApiUrl(env), method: 'post', data: params });

/**
 * 获取合约上留存的信息
 * @param params
 * @returns
 */
export const getContractInfoApi = (params: any) =>
  axiosRequest({ url: clusterApiUrl(env), method: 'post', data: params });

/**
 * 将十六进制四字节转换为小数
 */
export const getFloatFromHex = (value: string) =>
  request.get('/portal/cms/common/str2Hex', {
    params: {
      value: value,
    },
  });
