import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { Market } from '@project-serum/serum';

import {
  beforeContractTest,
  createConnection,
  getWalletName,
} from '@/utils/wallet/tools';
import {
  walletEnvEnum,
  getNowWalletAddress,
  walletSpeedConnect,
} from '@/utils/wallet/useWallet';
import publicPara from '@/utils/wallet/contract/publicPara';
import { hexConversion } from '@/utils/format/number';

const programID_pubKey = new PublicKey(publicPara.program_ID);
const serum_program_pubkey = new PublicKey(publicPara.serum_program_pubkey);
const system_program_pubkey = new PublicKey(publicPara.system_program_pubkey);
const psy_program_account = new PublicKey(publicPara.psy_program_pubkey);
const btc_mint_pubkey = new PublicKey(publicPara.btc_mint_pubkey);
const usdc_mint_pubkey = new PublicKey(publicPara.usdc_mint_pubkey);
const sysvar_program_pubkey = new PublicKey(publicPara.sysvar_program_pubkey);
const token_program_pubkey = new PublicKey(publicPara.token_program_pubkey);
const atoken_program_pubkey = new PublicKey(publicPara.atoken_program_pubkey);
const psy_program_pubkey = new PublicKey(publicPara.psy_program_pubkey);
const psy_usdc_pubkey = new PublicKey(publicPara.psy_usdc_pubkey);

const getOptionMarketPubKey = async (
  size: string | number,
  endTime: string | number,
  exercisePrice: string | number,
) => {
  console.log(size, exercisePrice, endTime);
  //1代表合约大小，如btc:size
  const option_size = (Number(size) * 10 ** 9).toString(16).padStart(16, '0');
  // const option_size = (1 * 10 ** 9).toString(16).padStart(16, '0');
  const option_size_buffer = Buffer.from(option_size, 'hex').swap64();
  //exercisePrice代表行权价，如40000元的看涨期权
  const strike = (Number(exercisePrice) * 10 ** 2)
    .toString(16)
    .padStart(16, '0');
  // const strike = (75500 * 10 ** 2).toString(16).padStart(16, '0');
  const strike_buffer = Buffer.from(strike, 'hex').swap64();
  //该期权的到期时间戳
  const timeStamp = Number(endTime).toString(16).padStart(16, '0');
  const timeStamp_buffer = Buffer.from(timeStamp, 'hex').swap64();

  const [option_market_pubkey] = await PublicKey.findProgramAddress(
    [
      btc_mint_pubkey.toBuffer(),
      usdc_mint_pubkey.toBuffer(),
      option_size_buffer,
      strike_buffer,
      timeStamp_buffer,
    ],
    psy_program_account,
  );
  return option_market_pubkey;
};

const getEventQueuePubkey = async (
  connection: Connection,
  market_pubkey: PublicKey,
) => {
  const market = await Market.load(
    connection,
    market_pubkey,
    { skipPreflight: true, commitment: 'confirmed' },
    serum_program_pubkey,
  );

  console.log(123);
  const bids = await market.loadBids(connection);

  try {
    return bids.market.decoded.eventQueue;
  } catch {
    return 0;
  }
};

const getBidsAndAsksPubKey = async (
  connection: Connection,
  market_pubkey: PublicKey,
) => {
  const market = await Market.load(
    connection,
    market_pubkey,
    { skipPreflight: true, commitment: 'confirmed' },
    serum_program_pubkey,
  );
  let bids = await market.loadBids(connection);

  try {
    return {
      bids: bids.market.bidsAddress,
      asks: bids.market.asksAddress,
    };
  } catch {
    return {
      bids: bids.market.bidsAddress,
      asks: bids.market.asksAddress,
    };
  }
};

const getVaulOwnerPubkey = async (market_pubkey: PublicKey) => {
  let nonce = 0;
  let vault_owner_pubkey;

  while (nonce < 255) {
    try {
      let nonce_hex = nonce.toString(16).padStart(16, '0');
      let nonce_buffer = Buffer.from(nonce_hex, 'hex').swap64();

      let vault_owner = await PublicKey.createProgramAddress(
        [market_pubkey.toBuffer(), nonce_buffer],
        serum_program_pubkey,
      );
      vault_owner_pubkey = vault_owner;
      break;
    } catch (e) {
      nonce++;
    }
  }

  return vault_owner_pubkey;
};

/**
 * 钱包下单处理
 * @param price 合约下单价
 * @param amount 购买份数
 * @param size 合约大小
 * @param endTime 截止日期时间戳
 * @param exercisePrice 行权价
 */
export default async function placeOrder(
  price: string | number,
  amount: string | number,
  size: string | number,
  endTime: string | number,
  exercisePrice: string | number,
) {
  // const testRes = await beforeContractTest();
  // if (!testRes) return false;

  const useWhatWallet = await getWalletName();
  if (!useWhatWallet) return false;

  await walletSpeedConnect(walletEnvEnum[useWhatWallet]);
  const windowWalletEnv = walletEnvEnum[useWhatWallet];
  const web3WalletAddress: string = await getNowWalletAddress(useWhatWallet);

  const connection = await createConnection();
  const wallet_pubkey = new PublicKey(web3WalletAddress);

  const option_market_pubkey = await getOptionMarketPubKey(
    size,
    endTime,
    exercisePrice,
  );

  const [market_pubkey] = await PublicKey.findProgramAddress(
    [
      option_market_pubkey.toBuffer(),
      usdc_mint_pubkey.toBuffer(),
      Buffer.from('serumMarket'),
    ],
    psy_program_account,
  );

  const [order_init_pubkey] = await PublicKey.findProgramAddress(
    [
      Buffer.from('open-orders-init'),
      serum_program_pubkey.toBuffer(),
      market_pubkey.toBuffer(),
    ],
    psy_program_account,
  );

  const [open_order_pubkey] = await PublicKey.findProgramAddress(
    [
      Buffer.from('open-orders'),
      serum_program_pubkey.toBuffer(),
      market_pubkey.toBuffer(),
      wallet_pubkey.toBuffer(),
    ],
    psy_program_account,
  );

  const [request_queue_pubkey] = await PublicKey.findProgramAddress(
    [
      option_market_pubkey.toBuffer(),
      usdc_mint_pubkey.toBuffer(),
      Buffer.from('requestQueue'),
    ],
    psy_program_account,
  );

  const [coin_vault_pubkey] = await PublicKey.findProgramAddress(
    [
      option_market_pubkey.toBuffer(),
      usdc_mint_pubkey.toBuffer(),
      Buffer.from('coinVault'),
    ],
    psy_program_account,
  );

  const [pc_vault_pubkey] = await PublicKey.findProgramAddress(
    [
      option_market_pubkey.toBuffer(),
      usdc_mint_pubkey.toBuffer(),
      Buffer.from('pcVault'),
    ],
    psy_program_account,
  );

  const [option_left_mint_pubkey] = await PublicKey.findProgramAddress(
    [option_market_pubkey.toBuffer(), Buffer.from('optionToken')],
    psy_program_account,
  );

  const [option_left_token_pubkey] = await PublicKey.findProgramAddress(
    [
      wallet_pubkey.toBuffer(),
      token_program_pubkey.toBuffer(),
      option_left_mint_pubkey.toBuffer(),
    ],
    atoken_program_pubkey,
  );

  const [writer_token_pubkey] = await PublicKey.findProgramAddress(
    [option_market_pubkey.toBuffer(), Buffer.from('writerToken')],
    psy_program_pubkey,
  );

  const [option_token_pubkey] = await PublicKey.findProgramAddress(
    [
      wallet_pubkey.toBuffer(),
      token_program_pubkey.toBuffer(),
      writer_token_pubkey.toBuffer(),
    ],
    atoken_program_pubkey,
  );

  const [btc_token_pubkey] = await PublicKey.findProgramAddress(
    [
      wallet_pubkey.toBuffer(),
      token_program_pubkey.toBuffer(),
      btc_mint_pubkey.toBuffer(),
    ],
    atoken_program_pubkey,
  );

  const [btc_pool_pubkey] = await PublicKey.findProgramAddress(
    [option_market_pubkey.toBuffer(), Buffer.from('underlyingAssetPool')],
    psy_program_account,
  );

  const [fees_pubkey] = await PublicKey.findProgramAddress(
    [Buffer.from('FeesAccount')],
    programID_pubKey,
  );

  const [funds_pubkey] = await PublicKey.findProgramAddress(
    [Buffer.from('FundsAccount')],
    programID_pubKey,
  );

  const [funds_btctoken_pubkey] = await PublicKey.findProgramAddress(
    [
      funds_pubkey.toBuffer(),
      token_program_pubkey.toBuffer(),
      btc_mint_pubkey.toBuffer(),
    ],
    atoken_program_pubkey,
  );

  const [funds_usdctoken_pubkey] = await PublicKey.findProgramAddress(
    [
      funds_pubkey.toBuffer(),
      token_program_pubkey.toBuffer(),
      usdc_mint_pubkey.toBuffer(),
    ],
    atoken_program_pubkey,
  );

  const [usdc_token_pubkey] = await PublicKey.findProgramAddress(
    [
      wallet_pubkey.toBuffer(),
      token_program_pubkey.toBuffer(),
      usdc_mint_pubkey.toBuffer(),
    ],
    atoken_program_pubkey,
  );

  const event_queue_pubkey = await getEventQueuePubkey(
    connection,
    market_pubkey,
  );

  const { bids: bids_pubkey, asks: asks_pubkey } = await getBidsAndAsksPubKey(
    connection,
    market_pubkey,
  );

  const vault_owner_pubkey = await getVaulOwnerPubkey(market_pubkey);

  const amount1 = '0100000000000000';
  const data = Buffer.from('03' + price + amount1, 'hex');
  // const data = Buffer.from('03' + price + amount, 'hex');

  console.log(
    serum_program_pubkey.toString(),
    system_program_pubkey.toString(),
    open_order_pubkey.toString(),
    wallet_pubkey.toString(),
    market_pubkey.toString(),
    sysvar_program_pubkey.toString(),
    order_init_pubkey.toString(),
    request_queue_pubkey.toString(),
    event_queue_pubkey.toString(),
    bids_pubkey.toString(),
    asks_pubkey.toString(),
    coin_vault_pubkey.toString(),
    pc_vault_pubkey.toString(),
    token_program_pubkey.toString(),
    option_left_token_pubkey.toString(),
    option_left_mint_pubkey.toString(),
    option_token_pubkey.toString(),
    writer_token_pubkey.toString(),
    btc_token_pubkey.toString(),
    btc_mint_pubkey.toString(),
    btc_pool_pubkey.toString(),
    option_market_pubkey.toString(),
    atoken_program_pubkey.toString(),
    psy_program_pubkey.toString(),
    fees_pubkey.toString(),
    funds_btctoken_pubkey.toString(),
    funds_usdctoken_pubkey.toString(),
    usdc_token_pubkey.toString(),
    usdc_mint_pubkey.toString(),
    vault_owner_pubkey.toString(),
    psy_usdc_pubkey.toString(),
  );
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: serum_program_pubkey, isSigner: false, isWritable: false },
      { pubkey: system_program_pubkey, isSigner: false, isWritable: false },
      { pubkey: open_order_pubkey, isSigner: false, isWritable: true },
      { pubkey: wallet_pubkey, isSigner: true, isWritable: true },
      { pubkey: market_pubkey, isSigner: false, isWritable: true },
      { pubkey: sysvar_program_pubkey, isSigner: false, isWritable: false },
      { pubkey: order_init_pubkey, isSigner: false, isWritable: true },
      { pubkey: request_queue_pubkey, isSigner: false, isWritable: true },
      { pubkey: event_queue_pubkey, isSigner: false, isWritable: true },
      { pubkey: bids_pubkey, isSigner: false, isWritable: true },
      { pubkey: asks_pubkey, isSigner: false, isWritable: true },
      { pubkey: coin_vault_pubkey, isSigner: false, isWritable: true },
      { pubkey: pc_vault_pubkey, isSigner: false, isWritable: true },
      { pubkey: token_program_pubkey, isSigner: false, isWritable: false },
      { pubkey: option_left_token_pubkey, isSigner: false, isWritable: true },
      { pubkey: option_left_mint_pubkey, isSigner: false, isWritable: true },
      { pubkey: option_token_pubkey, isSigner: false, isWritable: true },
      { pubkey: writer_token_pubkey, isSigner: false, isWritable: true },
      { pubkey: btc_token_pubkey, isSigner: false, isWritable: true },
      { pubkey: btc_mint_pubkey, isSigner: false, isWritable: false },
      { pubkey: btc_pool_pubkey, isSigner: false, isWritable: true },
      { pubkey: option_market_pubkey, isSigner: false, isWritable: false },
      { pubkey: atoken_program_pubkey, isSigner: false, isWritable: false },
      { pubkey: psy_program_pubkey, isSigner: false, isWritable: false },
      { pubkey: fees_pubkey, isSigner: false, isWritable: false },
      { pubkey: funds_btctoken_pubkey, isSigner: false, isWritable: true },
      { pubkey: funds_usdctoken_pubkey, isSigner: false, isWritable: true },
      { pubkey: usdc_token_pubkey, isSigner: false, isWritable: true },
      { pubkey: usdc_mint_pubkey, isSigner: false, isWritable: false },
      { pubkey: vault_owner_pubkey, isSigner: false, isWritable: false },
      { pubkey: psy_usdc_pubkey, isSigner: false, isWritable: false },
    ],
    programId: programID_pubKey,
    data: data,
  });

  const blockhash = (await connection.getLatestBlockhash()).blockhash;
  const transaction = new Transaction({
    recentBlockhash: blockhash,
    feePayer: wallet_pubkey,
  });
  transaction.add(instruction);
  let res = false;
  if (windowWalletEnv === 'solflare') {
    const signedTransaction = await window.solflare.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());
    console.log(signature, '11')
    try {
      await connection.confirmTransaction(signature);
      res = true;
    } catch {
      console.log('placeOrder Err');
    }
  } else {
    const { signature } = await window.solana.signAndSendTransaction(
      transaction,
    );
    try {
      await connection.confirmTransaction(signature);
      res = true;
    } catch {
      console.log('placeOrder Err');
    }
  }

  return res;
}
