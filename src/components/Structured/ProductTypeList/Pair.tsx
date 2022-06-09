import styled from 'styled-components';
import { useModel, history } from 'umi';
import { useCallback, useEffect, useState } from 'react';

import publicPara from '@/utils/wallet/contract/publicPara';
import { getUserOtherBalance } from '@/utils/wallet/tools';

import Bit from '@/assets/structProduct/bitcoin.svg';
import USDC from '@/assets/structProduct/usdcCoin.svg';

type Value = {
  value: any;
};
type MobileJudge = {
  isMobile: boolean;
};

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Back = styled.div`
  display: inline-block;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
  margin-bottom: 12px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

const CoinImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`;
const CoinName = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f5f5ff;
`;
const Wallet = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
  margin-bottom: 16px;
`;
const Balance = styled.div`
  display: flex;
  align-items: center;
  &:nth-of-type(1) {
    margin-right: 24px;
  }
`;
const WalletImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
const Surplus = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #f5f5ff;
`;
const FlexAlign = styled.div<MobileJudge>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.isMobile
      ? {
          marginBottom: '20px',
        }
      : ''};
`;
const Circle = styled.div`
  width: 6px;
  height: 6px;
  background: #111113;
  border-radius: 3px;
  margin-right: 6px;
`;
const Sign = styled.div<Value>`
  width: 61px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #111113;
  margin-left: 12px;
  background: ${(props) => (props.value === 'CALL' ? '#06D7F6' : '#FFF736')};
  border-radius: 8px;
`;

export default function QuestionResult(props: any) {
  const { isMobile } = useModel('useWindowSize');

  const [btcBalance, setBtcBalance] = useState<String | Number>('-');
  const [usdcBalance, setUsdcBalance] = useState<String | Number>('-');

  const btc = publicPara.btc_mint_pubkey;
  const usdc = publicPara.usdc_mint_pubkey;

  const refreshBalance = useCallback(async () => {
    const balance1 = await getUserOtherBalance(btc);
    const balance2 = await getUserOtherBalance(usdc);
    setBtcBalance(balance1 || '-');
    setUsdcBalance(balance2 || '-');
  }, []);

  useEffect(() => {
    refreshBalance();
  }, []);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Back onClick={() => goBack()}>&lt; Back</Back>
      <FlexWrap>
        <FlexAlign isMobile={isMobile}>
          <CoinImg src={Bit} />
          <CoinName>BTC</CoinName>
          <Sign value={props.type}>
            <Circle />
            {props.type}
          </Sign>
        </FlexAlign>
        <div>
          <Wallet>Wallet Balance</Wallet>
          <FlexWrap>
            <Balance>
              <WalletImg src={Bit} />
              <Surplus>{btcBalance} BTC</Surplus>
            </Balance>
            <Balance>
              <WalletImg src={USDC} />
              <Surplus>{usdcBalance} USDC</Surplus>
            </Balance>
          </FlexWrap>
        </div>
      </FlexWrap>
    </div>
  );
}
