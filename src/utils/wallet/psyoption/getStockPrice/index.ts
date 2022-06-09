import getSerumPriceByAssets from './getSerumPriceByAssets';

/**
 * 获取现货价格
 */
export default async function getStockPrice(rule: any): Promise<number> {
  const { baseMint, quoteMint } = rule;
  const price = await getSerumPriceByAssets(baseMint, quoteMint);
  return price;
}
