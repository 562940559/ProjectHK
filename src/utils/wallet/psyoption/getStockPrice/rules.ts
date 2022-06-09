import publicPara from '@/utils/wallet/contract/publicPara';

export const BTCToUSDC = {
  baseMint: publicPara.btc_mint_pubkey,
  quoteMint: publicPara.usdc_mint_pubkey,
};

export const USDCToBTC = {
  baseMint: publicPara.usdc_mint_pubkey,
  quoteMint: publicPara.btc_mint_pubkey,
};
