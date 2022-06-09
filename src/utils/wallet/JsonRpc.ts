// 进行solana官方接口请求
import { PublicKey } from '@solana/web3.js';

import publicPara from '@/utils/wallet/contract/publicPara';
import { createConnection } from '@/utils/wallet/tools';
import { getOtherTokenBalance, getContractInfoApi } from '@/services/JsonRpc';
import { decimalToHex } from '@/utils/format/number';
import { getFloatFromHex } from '@/services/JsonRpc';

const staticData = {
  jsonrpc: '2.0',
  id: 1,
};

/**
 * 获取用户非sol代币余额
 */
export async function getUserOtherTokenBalance(
  publicKey: PublicKey,
  mintAccount: PublicKey,
): Promise<number> {
  const data = {
    ...staticData,
    method: 'getTokenAccountsByOwner',
    params: [
      publicKey,
      {
        mint: mintAccount,
      },
      {
        encoding: 'jsonParsed',
      },
    ],
  };
  const requestRes = await getOtherTokenBalance(data);
  return Number(
    requestRes?.data?.result?.value[0]?.account?.data?.parsed?.info?.tokenAmount
      ?.uiAmount,
  );
}

/**
 * 获取合约上的手续费
 */
export async function getContractFee(): Promise<number> {
  const [funds_account] = await PublicKey.findProgramAddress(
    [Buffer.from('FeesAccount')],
    new PublicKey(publicPara.program_ID),
  );
  const connection = await createConnection();
  const res: any = await connection.getAccountInfo(
    new PublicKey(funds_account),
  );
  const dataArray = res?.data;

  // 获取到手续费十进制，转换为十六进制，大小端互换后转浮点
  const hex =
    decimalToHex(dataArray[3] || 0) +
    decimalToHex(dataArray[2] || 0) +
    decimalToHex(dataArray[1] || 0) +
    decimalToHex(dataArray[0] || 0);

  const { data } = await getFloatFromHex(hex);

  return data ? data : 0;
}

/**
 * 获取链上信息
 */
export async function getAccountInfo(publicKey: string): Promise<any> {
  const data = {
    ...staticData,
    method: 'getAccountInfo',
    params: [
      publicKey,
      {
        encoding: 'jsonParsed',
      },
    ],
  };
  const requestRes = await getContractInfoApi(data);
  console.log(requestRes);
}
