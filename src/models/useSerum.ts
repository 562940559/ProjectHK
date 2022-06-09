import { useState } from 'react';

import { getStockPrice } from '@/utils/wallet/psyoption';
import { BTCToUSDC } from '@/utils/wallet/psyoption/getStockPrice/rules';
import { getContractFee } from '@/utils/wallet/JsonRpc';

/**
 * serum相关数据
 * @returns stockPrice 现货价格
 * @returns feeRatio 手续费比例
 */
export default function useSerumModel() {
  const [stockPrice, setStockPrice] = useState<number | boolean>(false);
  const [feeRatio, setFeeRatio] = useState<number | boolean>(false);

  const refreshStockPrice = async () => {
    setStockPrice(false);
    const price = await getStockPrice(BTCToUSDC);
    setStockPrice(price);
  };

  const refreshFeeRatio = async () => {
    setFeeRatio(false);
    const newFee = await getContractFee();
    setFeeRatio(newFee);
  };

  return {
    stockPrice,
    refreshStockPrice,
    feeRatio,
    refreshFeeRatio,
  };
}
