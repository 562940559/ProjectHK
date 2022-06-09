import { PublicKey, Connection } from '@solana/web3.js';
import { Market } from '@project-serum/serum';

import { createConnection } from '@/utils/wallet/tools';
import Notification from '@/components/common/Notification';

export type Order = {
  price: number;
  size: number;
};

export async function findMarketByAssets(
  connection: Connection,
  baseMintAddress: PublicKey,
  quoteMintAddress: PublicKey,
  dexProgramKey: PublicKey,
) {
  const availableMarkets = await Market.findAccountsByMints(
    connection,
    baseMintAddress,
    quoteMintAddress,
    dexProgramKey,
  );
  if (availableMarkets.length) {
    return Market.load(
      connection,
      availableMarkets[0].publicKey,
      {},
      dexProgramKey,
    );
  }
  return null;
}

export async function getOrderbook(
  connection: Connection,
  market: Market,
  depth = 20,
) {
  try {
    const [bidOrderbook, askOrderbook] = await Promise.all([
      market.loadBids(connection),
      market.loadAsks(connection),
    ]);

    return {
      bidOrderbook,
      askOrderbook,
      bids: !bidOrderbook
        ? []
        : bidOrderbook.getL2(depth).map(([price, size]) => ({ price, size })),
      asks: !askOrderbook
        ? []
        : askOrderbook.getL2(depth).map(([price, size]) => ({ price, size })),
    };
  } catch (err: any) {
    console.error(err);
    Notification({
      type: 'error',
      message: err.message,
    });
  }
  return {
    bidOrderbook: null,
    askOrderbook: null,
    bids: [],
    asks: [],
  };
}

export async function getSerumOrderbook(serumMarket: Market) {
  const connection = createConnection();
  const {
    asks: _asks,
    bids: _bids,
    bidOrderbook,
    askOrderbook,
  } = await getOrderbook(connection, serumMarket);

  const orderbook = {
    bidOrderbook,
    askOrderbook,
    asks: _asks,
    bids: _bids,
  };
  return {
    orderbook: orderbook,
  };
}
