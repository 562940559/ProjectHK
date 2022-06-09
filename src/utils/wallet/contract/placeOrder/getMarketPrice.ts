/**
 * 获取市场价
 */
import { PublicKey } from '@solana/web3.js';

import { BTCToUSDC } from '@/utils/wallet/psyoption/getStockPrice/rules';
import { findMarketByAssets } from '@/utils/wallet/psyoption/serum';
import { createConnection } from '@/utils/wallet/tools';
import publicPara from '@/utils/wallet/contract/publicPara';

export default async function getMarketPrice() {
  const connection = createConnection();
  const serum_program_pubkey = new PublicKey(publicPara.serum_program_pubkey);
  const { baseMint, quoteMint } = BTCToUSDC;
  const baseMintKey =
    typeof baseMint === 'string' ? new PublicKey(baseMint) : baseMint;
  const quoteMintKey =
    typeof quoteMint === 'string' ? new PublicKey(quoteMint) : quoteMint;

  const market = await findMarketByAssets(
    connection,
    baseMintKey,
    quoteMintKey,
    serum_program_pubkey,
  );
  if (!market)
    return {
      bidOrderbook: null,
      askOrderbook: null,
      bids: [],
      asks: [],
    };

  const [bidOrderbook, askOrderbook] = await Promise.all([
    market.loadBids(connection),
    market.loadAsks(connection),
  ]);

  return {
    bidOrderbook,
    askOrderbook,
    bids: !bidOrderbook
      ? []
      : bidOrderbook.getL2(20).map(([price, size]) => ({ price, size })),
    asks: !askOrderbook
      ? []
      : askOrderbook.getL2(20).map(([price, size]) => ({ price, size })),
  };
}
