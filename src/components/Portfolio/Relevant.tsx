import styled from 'styled-components';
import { useModel, history } from 'umi';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'dva';

import publicPara from '@/utils/wallet/contract/publicPara';
import { getUserOtherBalance } from '@/utils/wallet/tools';

import Bit from '@/assets/structProduct/bitcoin.svg';
import USDC from '@/assets/structProduct/usdcCoin.svg';

type MobileJudge = {
  isMobile: boolean;
};

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const PurpleOut = styled.div<MobileJudge>`
  padding: 1px;
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  border-radius: 12px;
  margin-bottom: ${(props) => (props.isMobile ? '24px' : '')};
  width: ${(props) => (props.isMobile ? '100%' : '410.67px')};
  &.score {
    cursor: pointer;
  }
`;

const Inside = styled.div<MobileJudge>`
  background: #1e1e24;
  border-radius: 12px;
  padding: 24px;
  height: 112px;
`;

const Title = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
  margin-bottom: 16px;
`;

const Money = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #f5f5ff;
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Moderate = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #f5f5ff;
`;

const Score = styled.div`
  margin-left: 12px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #dd81ff;
`;

const GreyOut = styled.div<MobileJudge>`
  border: 1px solid #2c2c35;
  border-radius: 12px;
  width: ${(props) => (props.isMobile ? '100%' : '410.67px')};
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

export default function QuestionResult() {
  const { isMobile } = useModel('useWindowSize');
  const dispatch = useDispatch();

  const [btcBalance, setBtcBalance] = useState<String | Number>('-');
  const [usdcBalance, setUsdcBalance] = useState<String | Number>('-');
  const [OneResult, setList] = useState({ score: '-' });

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
    getData();
  }, []);

  // 查询用户最近一次答卷结果
  const getData = async () => {
    try {
      const res: any = await dispatch({ type: 'question/questionOne' });
      if (!res) {
        return;
      }
      setList(res);
    } catch (err) {}
  };

  const goBack = () => {
    history.goBack();
  };

  const toQuestion = () => {
    history.push('/questionnaire');
  };

  return (
    <Box>
      <PurpleOut isMobile={isMobile}>
        <Inside isMobile={isMobile}>
          <Title>Portfolio Value</Title>
          <Money>11 Products ≈ 143442.32USDC</Money>
        </Inside>
      </PurpleOut>
      <PurpleOut
        isMobile={isMobile}
        className="score"
        onClick={() => toQuestion()}
      >
        <Inside isMobile={isMobile}>
          <Title>My Questionnaire</Title>
          <FlexWrap>
            <Moderate>Moderate</Moderate>
            <Score>Socre：{OneResult.score} &gt;</Score>
          </FlexWrap>
        </Inside>
      </PurpleOut>
      <GreyOut isMobile={isMobile}>
        <Inside isMobile={isMobile}>
          <Title>Wallet Balance</Title>
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
        </Inside>
      </GreyOut>
    </Box>
  );
}
