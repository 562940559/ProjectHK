import * as bs58 from 'bs58';

import Notification from '@/components/common/Notification';

/**
 * 判断当前是否安装用户选择的钱包
 * @param wallet 钱包名称
 * @returns 是否安装对应钱包插件
 */
export function judgeProvider(wallet: string): boolean {
  const openDownloadPage = (path: string) => {
    Notification({
      type: 'error',
      message: 'wallet error',
      description: 'No corresponding wallet plugin found',
    });
    setTimeout(() => {
      window.open(path, '_blank');
    }, 1000);
  };

  if (wallet === 'Phantom') {
    console.log(window.solana)
    if ('solana' in window) return true;
    openDownloadPage('https://phantom.app/');
  }
  if (wallet === 'Solflare') {
    if ('solflare' in window && window.solflare.isSolflare) return true;
    openDownloadPage('https://solflare.com/');
  }
  return false;
}

/**
 * 获取当前用户的publickey
 * @param walletName 钱包名称
 * @returns 钱包地址（publickey）
 */
export async function getNowWalletAddress(walletName: string) {
  if (walletName === 'Phantom' && 'solana' in window) {
    const walletAddress =
      window.solana.publicKey && window.solana.publicKey.toString();
    return walletAddress;
  }
  if (walletName === 'Solflare' && 'solflare' in window) {
    const walletAddress =
      window.solflare.publicKey && window.solflare.publicKey.toString();
    return walletAddress;
  }

  return false;
}

export const walletEnvEnum: any = {
  Phantom: 'solana',
  Solflare: 'solflare',
};

export interface walletConCallback {
  end?: Function; // 连接钱包结束后的回调
}
/**
 * 连接钱包登录
 * @param wallet 钱包名称
 */
export function walletConnect(
  wallet: {
    name: string;
    icon: string;
    website: string;
  },
  shouldSign: boolean,
  callback?: walletConCallback,
) {
  if (walletEnvEnum[wallet.name]) {
    window[walletEnvEnum[wallet.name]]
      .connect({})
      .then(async () => {
        callback &&
          callback.end &&
          callback.end(1, {
            ...wallet,
          });
        if (shouldSign) {
          const message = '123';
          const signature = await walletSignMessage(
            message,
            {
              ...wallet,
            },
            callback,
          );
          if (!signature) return false;
          const walletAddress = await getNowWalletAddress(wallet.name);
          callback &&
            callback.end &&
            callback.end(2, {
              ...wallet,
              walletAddress: walletAddress,
              message: message,
              signature: signature,
            });
        }
      })
      .catch(() => {
        callback && callback.end && callback.end(0);
      });
  }
}

/**
 * 直连钱包
 */
export async function walletSpeedConnect(walletEnv: string) {
  try {
    await window[walletEnv].connect();
  } catch {
    throw new Error('connect error');
  }
}

/**
 * 钱包断开连接
 * @param wallet 钱包名称
 */
export function walletDisconnect() {
  if ('solana' in window) window.solana.request({ method: 'disconnect' });
  if ('solflare' in window) window.solflare.request({ method: 'disconnect' });
}

/**
 * 进行钱包签名加密
 * @param wallet 钱包名称
 * @param message 需要签名的内容
 * @returns 签名后的加密信息
 */
export async function walletSignMessage(
  message: string,
  wallet: {
    name: string;
  },
  callback?: walletConCallback,
) {
  let signedMessage;

  const encodedMessage = new TextEncoder().encode(message);
  if (wallet.name === 'Phantom') {
    signedMessage = await window.solana.request({
      method: 'signMessage',
      params: {
        message: encodedMessage,
      },
    });
  }
  if (wallet.name === 'Solflare') {
    signedMessage = await window.solflare.signMessage(encodedMessage, 'utf8');
    signedMessage.publicKey = await signedMessage.publicKey.toBase58();
    signedMessage.signature = await bs58.encode(signedMessage.signature);
  }

  if (signedMessage) {
    return signedMessage;
  } else {
    callback && callback.end && callback.end(2);
    return false;
  }
}
