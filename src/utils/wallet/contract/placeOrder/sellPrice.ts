import { judgeNumHavePoint } from '@/utils/format/number';

/**
 * 下单时候的卖价计算及手续费计算
 */
export const formatSellPrice = (price: number) => {
  let sellPrice: string | number = price;
  const numHavePoint = judgeNumHavePoint(price);
  if (numHavePoint) sellPrice = +sellPrice.toFixed(2);

  sellPrice = sellPrice * 100;
  sellPrice = sellPrice.toString(16);

  for (let a = sellPrice.length; a < 16; a++) {
    sellPrice += '0';
  }

  return sellPrice;
};

/**
 * 下单时候的卖出数量转换
 * 8字节小尾整型数
 */
export const formatSellAmount = (num: number) => {
  
  let hex = num.toString(16);
  console.log('原始值: ', num);
  const bit = 16;
  const count = bit - hex.length;

  for (let i = 0; i < count; i++) {
    hex = '0' + hex;
  }

  console.log('原16进制hex:', hex);
  let nHex = '';

  for (let i = 0; i < bit / 2; i++) {
    nHex = hex.substring(i * 2, i * 2 + 2) + nHex;
  }
  hex = nHex;

  console.log('小尾16进制hex:', hex);
  const result = parseInt('0x' + hex);
  console.log('小尾值：', result);
  return hex;
};
