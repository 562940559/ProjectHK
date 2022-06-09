import { PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';

import { getUserOtherTokenBalance } from './JsonRpc';
import { getUserInfo } from '@/services/login';
import { getItem } from '../storage';
import Notification from '@/components/common/Notification';

import {
  judgeProvider,
  walletConnect,
  walletEnvEnum,
  walletSpeedConnect,
  walletConCallback,
  getNowWalletAddress,
} from './useWallet';

/**
 * 生成connection状态
 * @returns Connection
 */
export function createConnection(): Connection {
  const env: any = process.env.WEB3_CONNECT_ENV;
  return new Connection(clusterApiUrl(env), 'confirmed');
}

/**
 * 判断当前用户是否保持登录态
 */
const loginStateJudge = async (): Promise<Boolean> => {
  const localUserInfo = await getItem('userInfo');
  const localToken = await getItem('token');
  if (!localUserInfo || !localToken) {
    Notification({
      type: 'error',
      message:
        'User information detection error, please login again or try later',
    });
    return false;
  }

  return true;
};

/**
 * 通过钱包登陆
 * @param wallet 钱包名
 * @returns publickey
 */
interface walletInfo {
  name: string;
  icon: string;
  website: string;
}
export async function loginWithWallet(
  wallet: walletInfo,
  callback?: walletConCallback,
) {
  const isProvider = await judgeProvider(wallet.name);
  if (!isProvider) {
    return false;
  }

  await walletConnect(wallet, true, callback);
}

/**
 * 获取保存在本地的登陆所用钱包
 */
export async function getWalletName(): Promise<string | false> {
  const { walletType } = await getItem('userInfo');
  if (!walletType) {
    Notification({
      type: 'error',
      message:
        'An error occurred while logging in to the wallet. Please log in again or try again later',
    });
    return false;
  }

  const walletEnum: any = {
    1: 'Phantom',
    2: 'Solflare',
  };

  return walletEnum[walletType];
}

/**
 * 在涉及私密合约调用时，进行登录态检测
 * 进行登录钱包是否安装检测
 * 进行登录用户与当前钱包address比对
 */
export async function beforeContractTest(): Promise<Boolean | string> {
  const isLogin = await loginStateJudge();
  if (!isLogin) return false;

  const useWhatWallet = await getWalletName();
  if (!useWhatWallet) return false;

  const isProvider = await judgeProvider(useWhatWallet);
  if (!isProvider) return false;

  await walletSpeedConnect(walletEnvEnum[useWhatWallet]);
  const userInfo = (await getUserInfo()).data;
  const web3WalletAddress = await getNowWalletAddress(useWhatWallet);
  if (userInfo.walletAddress !== web3WalletAddress) {
    Notification({
      type: 'error',
      message: `The login account is different from the current wallet connection account. Please check the current wallet connection. The current wallet connection account is: ${web3WalletAddress}`,
    });
    return false;
  }

  return web3WalletAddress;
}

/**
 * 获取用户其他币种余额
 */
export async function getUserOtherBalance(
  mint: string,
): Promise<Number | String> {
  const testRes = await beforeContractTest();
  if (!testRes) return '-';

  if (mint === '') return '-';

  const publicKey = new PublicKey(testRes);
  const mintAccount = new PublicKey(mint);
  const res = await getUserOtherTokenBalance(publicKey, mintAccount);
  return res;
}
