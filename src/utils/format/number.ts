import BigNumber from 'big.js';

/**
 * 进行加减乘除计算 避免精度问题
 */
export const calcFn = {
  add(props: any): number {
    const arg: any = Array.from(props);
    return (
      arg
        .reduce((total: number, num: number) => {
          return new BigNumber(total).plus(new BigNumber(num));
        })
        .toString() * 1
    );
  },
  sub(props: any) {
    const arg: any = Array.from(props);
    return (
      arg
        .reduce((total: number, num: number) => {
          return new BigNumber(total).minus(new BigNumber(num));
        })
        .toString() * 1
    );
  },
  mul(props: any) {
    const arg: any = Array.from(props);
    return (
      arg
        .reduce((total: number, num: number) => {
          return new BigNumber(total).times(new BigNumber(num));
        })
        .toString() * 1
    );
  },
  divide(props: any) {
    const arg: any = Array.from(props);
    return (
      arg
        .reduce((total: number, num: number) => {
          return new BigNumber(total).div(new BigNumber(num));
        })
        .toString() * 1
    );
  },
};

/**
 * 判断数字是否有小数点
 */
export function judgeNumHavePoint(number: number) {
  const num = number + '';
  const rep = /[.]/;

  return rep.test(num);
}

/**
 * 获取小数有多少位
 */
export function getNumberOfDigits(num: number): number {
  const x = String(num).indexOf('.') + 1;
  const y = String(num).length - x;

  return Number(y);
}

/**
 * 进制转换（十进制转十六进制）
 */
export function decimalToHex(num: number): string {
  const a = num;
  const b = a.toString(16);

  return b;
}

/**
 * 进行hex大小端转换
 */
export function hexConversion(hex: string): string {
  let data = hex.replace(/\s/g, '').replace(/(.{2})/g, '$1 ');
  data = data.split(' ').reverse().join('');
  return data;
}

/**
 * 数字转为8位小尾整数
 * @param num
 */
export function intToHex(num: number) {
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
}
