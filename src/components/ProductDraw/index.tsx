import styled from 'styled-components';
import { useModel } from 'umi';
import React, { useEffect, useState } from 'react';

import Notification from '@/components/common/Notification';
import BuyModal from '@/components/BuyModal';

import Close from '@/assets/question/close.png';
import Bit from '@/assets/structProduct/bitcoin.svg';
import {
  getProductHistoryTransactionRecord,
  ProductHistoryTransactionRecordType,
} from '@/services/product';
import PerformanceChart from '@/components/ProductEcharts';

type MobileJudge = {
  isMobile: boolean;
};

type selfProps = {
  setType: Function;
  record: any;
  openIt: boolean;
  type: string;
};

type ShowType = {
  isShow: boolean;
};

type Value = {
  value: any;
};

type Color = {
  color: string;
};

const Mask = styled.div<ShowType>`
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
`;

const PopBox = styled.div<MobileJudge>`
  position: absolute;
  top: 50%;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  padding: 1px;
  border-radius: 24px;
  width: 866px;
  .scroll::-webkit-scrollbar {
    width: 0px;
  }
  ${({ isMobile }) =>
    isMobile
      ? {
          width: 'auto',
          transform: 'translateY(-50%)',
          margin: '0 20px',
        }
      : {
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
`;

const InsideBox = styled.div`
  background: #111113;
  padding: 24px;
  border-radius: 24px;
  font-family: 'Poppins';
  max-height: 80vh;
  overflow-y: auto;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.div<MobileJudge>`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f5f5ff;
  width: ${(props) => (props.isMobile ? '267px' : '')};
`;

const CloseImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const FlexAlign = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #f5f5ff;
  }
`;

const CommonFont = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #f5f5ff;
`;

const WalletImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 12px;
  margin-right: 4px;
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
  background: ${(props) =>
    props.value === 'COVER_CALLS' ? '#06D7F6' : '#FFF736'};
  border-radius: 8px;
`;

const Circle = styled.div`
  width: 6px;
  height: 6px;
  background: #111113;
  border-radius: 3px;
  margin-right: 6px;
`;

const FlexLia = styled.div`
  display: flex;
  margin-top: 24px;
  flex-wrap: wrap;
`;

const OkBtn = styled.div<Value>`
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  border-radius: 12px;
  width: 240px;
  margin: 0 auto;
  margin-top: 24px;
  display: ${(props) => (props.value === '3' ? 'none' : 'block')};
`;

const Left = styled.div<MobileJudge>`
  background: #1e1e24;
  border-radius: 12px;
  padding: 12px;
  ${({ isMobile }) =>
    isMobile
      ? {
          marginBottom: '20px',
        }
      : {
          marginRight: '20px',
        }}
`;

const Dian = styled.div<Color>`
  width: 6px;
  height: 6px;
  background: ${(props) => props.color};
  margin-right: 8px;
  margin-right: 8px;
  border-radius: 3px;
`;

const OneItem = styled.div`
  margin-bottom: 24px;
`;

const Des = styled.div<MobileJudge>`
  margin-top: 8px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #a9a9b7;
  width: ${(props) => (props.isMobile ? 'auto' : '292px')};
`;

const TradeTable = styled.div`
  margin: 12px 0 20px 0;
  border: 1px solid #2c2c35;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
  text-align: center;
  border-bottom: none;
`;

const BotRight = styled.div<MobileJudge>`
  border-bottom: 1px solid #2c2c35;
  border-right: 1px solid #2c2c35;
  width: ${(props) => (props.isMobile ? '33vw' : '164px')};
  height: 42px;
  line-height: 42px;
  box-sizing: border-box;
  &.center {
    width: ${(props) => (props.isMobile ? '23.67vw' : '232px')};
  }
`;

const BotBorder = styled.div<MobileJudge>`
  border-bottom: 1px solid #2c2c35;
  width: ${(props) => (props.isMobile ? '19.33vw' : '78px')};
  height: 42px;
  line-height: 42px;
  box-sizing: border-box;
`;

const ProductDraw: React.FC<selfProps> = (props) => {
  const [isShow, setShow] = useState(false);
  const [BuyShow, setBuyType] = useState(false);
  const [modalData, setModalData] = useState({});
  const [historyList, setHistoryList] =
    useState<ProductHistoryTransactionRecordType>();
  // record为当前行的数据
  const { setType, record, openIt } = props;

  const { isMobile } = useModel('useWindowSize');
  const { stockPrice, refreshStockPrice } = useModel('useSerum');

  const LeftList = [
    {
      color: '#FFF736',
      name: 'Fee',
      des: 'The vault fee structure consists of a 2% annualised management fee and a xx% performance fee. If the weekly strategy is profitable, the weekly performance fee is charged on the premiums earned and the weekly management fee is charged on the assets managed by the vault. If the weekly strategy is unprofitable, there are no fees charged',
    },
    {
      color: '#E80FE9',
      name: 'WITHDRAWALS',
      des: 'Once user funds have been used in the vault’s weekly strategy they cannot be withdrawn until the vault closes it’s position the following Friday at 12pm UTC.Users can withdraw their funds instantly during the weekly timelock period where the vault closes it’s previous position and opens its new position.',
    },
    {
      color: '#06D7F6',
      name: 'Risk',
      des: 'The primary risk for running this covered call strategy is that the vault may incur a loss in the case where the call options sold by the vault expire in-the-money (meaning the price of BTC is above the strike price of the call options minted by the vault).',
    },
  ];

  const clickBtn = (e: any) => {
    if (typeof e === 'string') {
      // 按钮为SELL
      if (e === '2') {
        Notification({
          type: 'info',
          message: 'Coming soon',
        });
      } else {
        // 按钮为Buy
        setBuyType(true);
        setModalData(record);
      }
    } else {
      // 点击弹窗右上角叉
      setShow(false);
      setType(false);
    }
  };

  const changeShow = (e: boolean) => {
    setBuyType(e);
  };

  useEffect(() => {
    setShow(openIt);
  }, [openIt]);

  useEffect(() => {
    if (!isMobile) refreshStockPrice().then();
  }, [isMobile]);

  // 获取产品历史交易记录
  useEffect(() => {
    if (!record.id || !stockPrice) return;

    const curPrice = stockPrice as number;

    getProductHistoryTransactionRecord(record.id, curPrice).then((res) => {
      setHistoryList(res.data);
    });
  }, [record.id, stockPrice]);

  return (
    <Mask isShow={isShow}>
      <PopBox isMobile={isMobile}>
        <InsideBox className="scroll">
          <Top>
            <Title isMobile={isMobile}>{record.name}</Title>
            <CloseImg src={Close} onClick={() => clickBtn(false)} />
          </Top>
          <FlexAlign>
            <CommonFont>Strategy:</CommonFont>
            <FlexAlign>
              <WalletImg src={Bit} />
              <span>BTC</span>
            </FlexAlign>
            <Type value={record.type}>
              <Circle />
              {record.type === 'COVER_CALLS' ? 'CALL' : 'PUT'}
            </Type>
          </FlexAlign>
          <FlexLia>
            <Left isMobile={isMobile}>
              {LeftList.map((item, index) => {
                return (
                  <OneItem key={index}>
                    <FlexAlign>
                      <Dian color={item.color} />
                      <CommonFont>{item.name}</CommonFont>
                    </FlexAlign>
                    <Des isMobile={isMobile}>{item.des}</Des>
                  </OneItem>
                );
              })}
            </Left>
            <div>
              <FlexAlign>
                <Dian color="#FF9315" />
                <CommonFont>Trade History</CommonFont>
              </FlexAlign>
              <TradeTable>
                <FlexAlign>
                  <BotRight isMobile={isMobile}>Date Time</BotRight>
                  <BotRight className="center" isMobile={isMobile}>
                    Price(USDC)
                  </BotRight>
                  <BotBorder isMobile={isMobile}>Quantity</BotBorder>
                </FlexAlign>
                {historyList?.tradeList.map((item, index) => {
                  return (
                    <FlexAlign key={index}>
                      <BotRight isMobile={isMobile}>{item.tradeTime}</BotRight>
                      <BotRight className="center" isMobile={isMobile}>
                        {item.price}
                      </BotRight>
                      <BotBorder isMobile={isMobile}>{item.quantity}</BotBorder>
                    </FlexAlign>
                  );
                })}
              </TradeTable>
              <FlexAlign>
                <Dian color="#0062FF" />
                <CommonFont>Performance Chart</CommonFont>
              </FlexAlign>
              {historyList?.profitData ? (
                <PerformanceChart seriesData={historyList.profitData} />
              ) : null}
            </div>
          </FlexLia>
          <OkBtn value={props.type} onClick={() => clickBtn(props.type)}>
            {props.type == '1' ? 'Buy' : 'Sell'}
          </OkBtn>
        </InsideBox>
      </PopBox>
      <Mask isShow={BuyShow}>
        <BuyModal
          changeShow={changeShow}
          isShow={BuyShow}
          modalData={modalData}
        />
      </Mask>
    </Mask>
  );
};

export default ProductDraw;
