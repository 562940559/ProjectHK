import { PublicKey } from '@solana/web3.js';

import { getSerumOrderbook } from '@/utils/wallet/psyoption/serum';
import { createConnection } from '@/utils/wallet/tools';
import { findMarketByAssets } from '@/utils/wallet/psyoption/serum';
import getPriceFromSerumOrderbook from './getPriceFromSerumOrderbook';
import publicPara from '@/utils/wallet/contract/publicPara';

export default async function getSerumPriceByAssets(
  baseMint: PublicKey | string,
  quoteMint: PublicKey | string,
): Promise<number> {
  const dexProgramId = new PublicKey(publicPara.serum_program_pubkey);

  const connection = createConnection();

  if (!baseMint || !quoteMint || !dexProgramId) {
    return 0;
  }
  const baseMintKey =
    typeof baseMint === 'string' ? new PublicKey(baseMint) : baseMint;
  const quoteMintKey =
    typeof quoteMint === 'string' ? new PublicKey(quoteMint) : quoteMint;
  const market = await findMarketByAssets(
    connection,
    baseMintKey,
    quoteMintKey,
    dexProgramId,
  );
  if (!market) {
    return 0;
  }

  const { orderbook } = await getSerumOrderbook(market);
  const _price = await getPriceFromSerumOrderbook(orderbook);
  const price = _price ?? 0;

  return price;
}
