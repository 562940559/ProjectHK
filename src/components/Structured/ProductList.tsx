import styled from 'styled-components';
import { useModel, history } from 'umi';

import Notification from '@/components/common/Notification';

import Bit from '@/assets/structProduct/bitcoin.svg';

type MobileJudge = {
  isMobile: boolean;
};

type Value = {
  value: any;
};

const Box = styled.div<MobileJudge>`
  width: 410.67px;
  background: #1e1e24;
  border-radius: 20px;
  padding: 20px;
  cursor: pointer;
  &:hover {
    .SelectHover {
      background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
      color: #f5f5ff;
    }
  }
  ${({ isMobile }) =>
    isMobile
      ? {
          marginBottom: '24px',
        }
      : {
          marginRight: '24px',
        }}
`;
const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Type = styled.div<Value>`
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
const Circle = styled.div`
  width: 6px;
  height: 6px;
  background: #111113;
  border-radius: 3px;
  margin-right: 6px;
`;
const FlexAlign = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  span {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #f5f5ff;
  }
`;
const WalletImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`;
const Des = styled.div`
  margin-top: 24px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
  height: 110px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
`;
const Estate = styled.div`
  margin-top: 24px;
  color: #f5f5ff;
`;
const Left = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`;
const Right = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;
const Select = styled.div`
  margin-top: 24px;
  background: linear-gradient(
    113.25deg,
    rgba(221, 129, 255, 0.3) 15.03%,
    rgba(73, 28, 255, 0.3) 84.97%
  );
  color: #70707c;
  border-radius: 12px;
  height: 48px;
  line-height: 48px;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
`;

export default function ProductType() {
  const { isMobile } = useModel('useWindowSize');
  const { checkLogin, userInfo } = useModel('useUser');

  const list = [
    {
      type: 'CALL',
      des: ' “Long BTC and Sell Call Option expiring on [Date] at a strike price of [$xxx] .  This strategy provides income in neutral markets, a selling price above the current stock price in rising markets, and a small amount of downside protection.”',
    },
    {
      type: 'PUT',
      des: '“Long BTC and Buy Put Option expiring on [Date] at a strike price of [$xxx]. This strategy keeps downside losses limited while preserving unlimited potential gains to the upside.”',
    },
  ];

  const toDeatil = (e: any) => {
    if (!checkLogin()) {
      return Notification({
        type: 'error',
        message: 'error',
        description: 'Please Login',
      });
    }
    history.push({
      pathname: '/structProducts/ProductTypeList',
      query: {
        type: e,
      },
    });
  };

  return (
    <FlexAlign>
      {list.map((item, index) => {
        return (
          <Box
            key={index}
            isMobile={isMobile}
            onClick={() => toDeatil(item.type)}
          >
            <FlexWrap>
              <FlexAlign>
                <WalletImg src={Bit} />
                <span>BTC</span>
              </FlexAlign>
              <Type value={item.type}>
                <Circle />
                {item.type}
              </Type>
            </FlexWrap>
            <Des>{item.des}</Des>
            {JSON.stringify(userInfo) === '{}' ? null : (
              <Estate>
                <FlexWrap>
                  <Left>Holdings</Left>
                  <Right>12334 USDC</Right>
                </FlexWrap>
                <FlexWrap>
                  <Left>Your Position</Left>
                  <Right>454 USDC</Right>
                </FlexWrap>
              </Estate>
            )}
            <Select className="SelectHover">Select</Select>
          </Box>
        );
      })}
    </FlexAlign>
  );
}
