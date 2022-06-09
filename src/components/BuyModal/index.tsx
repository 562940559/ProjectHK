import styled from 'styled-components';
import { useModel } from 'umi';
import { useEffect, useState, useRef, useCallback } from 'react';

import { formatDateToUTC } from '@/utils/format/time';
import {
  calcFn,
  judgeNumHavePoint,
  getNumberOfDigits,
} from '@/utils/format/number';
// import placeOrder from '@/utils/wallet/contract/placeOrder';
// import getMarketPrice from '@/utils/wallet/contract/placeOrder/getMarketPrice';
import {
  formatSellPrice,
  formatSellAmount,
} from '@/utils/wallet/contract/placeOrder/sellPrice';
import contractPlaceOrder from '@/utils/wallet/contract/placeOrder';

import Close from '@/assets/question/close.png';
import { placeOrder, updateOrder } from '@/services/product';
import Notification from '@/components/common/Notification';

type MobileJudge = {
  isMobile: boolean;
};

type propsType = {
  changeShow: Function;
  isShow: boolean;
  modalData: any;
};

const PopBox = styled.div<MobileJudge>`
  position: absolute;
  top: 50%;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  padding: 1px;
  border-radius: 12px;
  .scroll::-webkit-scrollbar {
    width: 0px;
  }
  ${({ isMobile }) =>
    isMobile
      ? {
          width: '90vw',
          transform: 'translateY(-50%)',
          margin: '0 20px',
        }
      : {
          width: '480px',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
`;
const InsideBox = styled.div`
  background: #111113;
  padding: 24px;
  border-radius: 12px;
  font-family: 'Poppins';
  max-height: 80vh;
  overflow-y: auto;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f5f5ff;
`;
const CloseImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const Name = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: #f5f5ff;
  margin: 24px 0;
`;

const Spot = styled.div`
  background: rgba(255, 147, 21, 0.2);
  border-radius: 12px;
  padding: 9px 12px;
  font-size: 14px;
  color: #a9a9b7;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;
const Price = styled.div`
  font-size: 16px;
  color: #ff9315;
  font-weight: 500;
  margin-left: 12px;
`;
const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  font-size: 14px;
  line-height: 22px;
`;
const Left = styled.div`
  color: #a9a9b7;
  width: 173px;
`;
const Right = styled.div`
  color: #f5f5ff;
  flex: 1;
  text-align: right;
  &.hide {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    position: relative;
  }
`;
const Quantity = styled.div`
  margin: 16px 0;
  padding: 12px;
  background: #1e1e24;
  border-radius: 12px;
`;
const Number = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #f5f5ff;
`;
const Mt12 = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
`;
const Step = styled.div`
  display: flex;
`;
const StepBtn = styled.div`
  width: 32px;
  height: 32px;
  line-height: 32px;
  background: #2c2c35;
  border-radius: 8px;
  font-size: 18px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  margin-left: 8px;
  cursor: pointer;
`;
const FlexAlign = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Charge = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #a9a9b7;
`;
const Tar = styled.div`
  text-align: right;
`;
const PayPrice = styled.div`
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #dd81ff;
  display: inline-block;
`;
const Unit = styled.div`
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-left: 4px;
`;
const Bottom = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
`;
const Cancelbtn = styled.div`
  height: 48px;
  background: #2c2c35;
  border-radius: 12px;
  line-height: 48px;
  color: #a9a9b7;
  cursor: pointer;
  margin-right: 12px;
  flex: 1;
`;
const OkBtn = styled.div`
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  height: 48px;
  line-height: 48px;
  flex: 1;
  border-radius: 12px;
`;
const More = styled.span`
  color: #dd81ff;
  position: absolute;
  right: 0;
  bottom: 0;
  background: #111113;
  padding-left: 5px;
  cursor: pointer;
`;
const Source = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #70707c;
`;

/**
 * 计算出每次数量改变的最小单位
 * 计算数量的最小精度为多少位，没有小数则数量改变的最小单位为1
 * 其余按照最小精度改变
 */
const getGradient = (num: number): number => {
  const res = judgeNumHavePoint(num);
  if (!res) return 1;

  const decimals = getNumberOfDigits(num);
  const res2 = (calcFn.divide([1, 10]) ** decimals).toFixed(decimals);

  return +res2;
};

const BuyModal = (props: propsType) => {
  const { changeShow, isShow, modalData } = props;

  const [moreTag, setTag] = useState(false);
  const [singleQuantity, setSingleQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [allPay, setAllPay] = useState<number>(0);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const ptage = useRef(null);

  const { isMobile } = useModel('useWindowSize');
  const { stockPrice, feeRatio, refreshFeeRatio } = useModel('useSerum');

  useEffect(() => {
    if (isShow) {
      setSingleQuantity(+modalData?.singleQuantity);
      refreshFeeRatio();
      const a: any = ptage.current;
      if (a.clientHeight / 22 > 3) {
        setTag(true);
      } else {
        setTag(false);
      }
    } else {
      setTag(false);
      setSingleQuantity(0);
      setPrice(0);
      setAllPay(0);
    }
  }, [isShow]);

  const paraValidation = useCallback(() => {
    if (confirmLoading) {
      Notification({
        type: 'info',
        message: 'loading transaction',
      });
      return false;
    }

    if (feeRatio === false) {
      Notification({
        type: 'error',
        message: 'loading fee',
      });
      return false;
    }

    if (stockPrice === false) {
      Notification({
        type: 'error',
        message: 'loading spot price',
      });
      return false;
    }

    // if (stockPrice === 0) {
    //   Notification({
    //     type: 'error',
    //     message: 'The Psyoption platform gets the spot price abnormally. Please try again later',
    //   });
    //   return false
    // }

    return true;
  }, [feeRatio, stockPrice]);

  /**
   * 价格更新
   * 价格=现货价（stockPrice）* size * 数量
   * 总价=价格+手续费
   */
  const refreshPrice = useCallback(async () => {
    const newPrice = calcFn.mul([
      calcFn.mul([singleQuantity, modalData?.size || 0]),
      stockPrice,
    ]);
    await setPrice(newPrice);
    const newAllPay = calcFn.add([newPrice, calcFn.mul([+feeRatio, newPrice])]);
    await setAllPay(newAllPay);
  }, [feeRatio, singleQuantity, price, modalData?.size, stockPrice]);

  useEffect(() => {
    if (feeRatio !== false && singleQuantity) {
      refreshPrice().then();
    }
  }, [feeRatio, singleQuantity]);

  const clickBtn = (e: boolean) => {
    changeShow(e);
  };

  /**
   * 加减数量
   * 数量初始值为列表最小单位数量
   * 数量最小值不能小于最小单位数量
   */
  const changeSingleQuantity = useCallback(
    async (method) => {
      if (feeRatio === false) return;
      const unit = getGradient(+modalData?.singleQuantity);
      if (method) {
        setSingleQuantity(calcFn.add([singleQuantity, unit]));
      }
      if (!method) {
        if (singleQuantity - unit <= 0) {
          setSingleQuantity(modalData?.singleQuantity);
        } else {
          setSingleQuantity(calcFn.sub([singleQuantity, unit]));
        }
      }
      await refreshPrice();
    },
    [singleQuantity, feeRatio],
  );

  const goPlaceOrder = useCallback(async () => {
    const validationRes = paraValidation();
    if (!validationRes) return;

    setConfirmLoading(true);

    const placeOrderParams = {
      price: stockPrice as number,
      feeRate: feeRatio as number,
      id: modalData.id as string,
      quantity: singleQuantity,
    };

    try {
      // 调用服务端下单方法
      await placeOrder(placeOrderParams);
      const price = formatSellPrice(allPay);
      const amount = formatSellAmount(placeOrderParams.quantity);

      // 调用合约下单方法
      await contractPlaceOrder(
        price,
        amount,
        modalData.size,
        modalData.expirationDate,
        modalData.callPrice,
      );

      // 服务端更新订单状态-进行中
      await updateOrder({ orderId: placeOrderParams.id, status: 1 });
      clickBtn(false);
      setConfirmLoading(false);
      Notification({
        type: 'success',
        message: 'placeOrder success',
      });
    } catch (e) {
      // 服务端更新订单状态-未成交已取消
      await updateOrder({ orderId: placeOrderParams.id, status: 3 });
      setConfirmLoading(false);
      Notification({
        type: 'error',
        message: 'placeOrder error',
      });
    }
  }, [stockPrice, feeRatio, singleQuantity, modalData.id]);

  return (
    <PopBox isMobile={isMobile}>
      <InsideBox className="scroll">
        <Top>
          <Title>BUY</Title>
          <CloseImg src={Close} onClick={() => clickBtn(false)} />
        </Top>
        <Name>{modalData?.name}</Name>
        <Spot>
          <FlexAlign>
            Spot Price:
            <Price>{stockPrice === false ? 'loading...' : stockPrice}</Price>
          </FlexAlign>
          <Source>From Https://Raydium.io</Source>
        </Spot>
        <FlexWrap>
          <Left>Expiration Date</Left>
          <Right>{formatDateToUTC(modalData?.expirationDate)}</Right>
        </FlexWrap>
        <FlexWrap>
          <Left>Call Price(USDC)</Left>
          <Right>{modalData?.callPrice}</Right>
        </FlexWrap>
        <FlexWrap>
          <Left>Product Description</Left>
          <Right ref={ptage} className={moreTag ? 'hide' : ''}>
            {modalData?.remark}
            {moreTag ? (
              <More onClick={() => setTag(false)}>More&gt;</More>
            ) : null}
          </Right>
        </FlexWrap>
        <Quantity>
          <Left>Order Quantity</Left>
          <Mt12>
            <Number>{singleQuantity}</Number>
            <Step>
              <StepBtn onClick={() => changeSingleQuantity(1)}>+</StepBtn>
              <StepBtn onClick={() => changeSingleQuantity(0)}>-</StepBtn>
            </Step>
          </Mt12>
        </Quantity>
        <FlexAlign>
          <Left>Pay</Left>
          <Tar>
            <PayPrice>
              {allPay}
              <Unit>USDC</Unit>
            </PayPrice>
            <Charge>
              {feeRatio === false
                ? 'loading...'
                : `Fee ${calcFn.mul([+feeRatio, price])} USDC`}
            </Charge>
          </Tar>
        </FlexAlign>
        <Bottom>
          <Cancelbtn onClick={() => clickBtn(false)}>Cancel</Cancelbtn>
          <OkBtn onClick={() => goPlaceOrder()}>Confirm</OkBtn>
        </Bottom>
      </InsideBox>
    </PopBox>
  );
};

export default BuyModal;
