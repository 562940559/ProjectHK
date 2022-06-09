import styled from 'styled-components';
import { useModel } from 'umi';
import { useEffect, useState } from 'react';

import ProductList from '@/components/ProductList';
import Notification from '@/components/common/Notification';

import Bit from '@/assets/structProduct/bitcoin.svg';
import {
  getUserOrderList,
  UserOrderListReqType,
  UserOrderListType,
} from '@/services/product';
import { formatType } from '@/utils/format/product';

type Value = {
  value: any;
};

interface UserProductPropsType {
  curTab: 'Portfolio' | 'History' | string;
}

const Box = styled.div``;
const Green = styled.div<Value>`
  color: ${(props) => (props.value < 0 ? '#FD4438' : '#15FFAB')};
  span {
    font-size: 12px;
  }
`;
const Buy = styled.div`
  width: 66px;
  height: 40px;
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  border-radius: 12px;
  font-size: 14px;
  line-height: 40px;
  color: #f5f5ff;
  text-align: center;
  cursor: pointer;
`;
const Date = styled.div`
  color: #a9a9b7;
`;
const Order = styled.div`
  color: #70707c;
`;
const Type = styled.div`
  width: 61px;
  height: 28px;
  background: #2c2c35;
  border-radius: 8px;
  font-size: 14px;
  line-height: 28px;
  color: #f5f5ff;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Circle = styled.div<Value>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: ${(props) => (props.value === 'CALL' ? '#06D7F6' : '#FFF736')};
  margin-right: 6px;
`;
const FlexAlign = styled.div`
  display: flex;
  align-items: center;
`;
const WalletImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

/**
 * 用户订单列表
 * @param curTab 当前列表Tab（Portfolio：正在进行中; History: 历史列表）
 * @constructor
 */
export default function UserProduct({ curTab }: UserProductPropsType) {
  const { isMobile } = useModel('useWindowSize');
  const { stockPrice, refreshStockPrice } = useModel('useSerum');
  const [orderListParams, setOrderListParams] = useState<UserOrderListReqType>({
    page: 1,
    size: 10,
    status: 1,
  });
  const [data, setData] = useState<PaginationRes<UserOrderListType[]>>({
    records: [],
    total: 0,
  });

  useEffect(() => {
    if (!isMobile) {
      refreshStockPrice();
    }
  }, [isMobile]);

  useEffect(() => {
    if (curTab === 'History')
      setOrderListParams((prev) => ({ ...prev, status: 2, page: 1 }));
    if (curTab === 'Portfolio')
      setOrderListParams((prev) => ({ ...prev, status: 1, page: 1 }));
  }, [curTab]);

  // 初始化历史订单列表
  useEffect(() => {
    (async () => {
      const res = await getUserOrderList(orderListParams);
      setData(res.data);
    })();
  }, [orderListParams]);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      width: '40px',
      render: (text: string) => <Order>{text}</Order>,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      width: '207px',
    },
    {
      title: 'Description',
      dataIndex: 'remark',
      width: '228px',
      render: (text: string) => <Date>{text}</Date>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text: string) => {
        const typeStr = formatType(text);
        return (
          <Type>
            <Circle value={typeStr} />
            <span>{typeStr}</span>
          </Type>
        );
      },
    },
    {
      title: 'Underlying',
      dataIndex: 'underlying',
      render: () => (
        <FlexAlign>
          <WalletImg src={Bit} />
          <span>BTC</span>
        </FlexAlign>
      ),
    },
    {
      title: 'Open Price(USDC)',
      dataIndex: 'openPrice',
    },
    {
      title: 'Underlying Price(USDC)',
      dataIndex: 'Underlying Price',
      render: () => (
        <Green value={stockPrice}>
          {stockPrice === false ? 'loading...' : stockPrice}
        </Green>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
    },
    {
      title: 'Profit/Loss(USDC)',
      dataIndex: 'loss',
      width: '163px',
      render: (text: number, record: UserOrderListType) => {
        const spotPrice = Number(stockPrice);
        const diffVal = spotPrice - record.openPrice;
        const income = Math.abs(diffVal) * record.number;
        const rateOfReturn =
          (Math.abs(diffVal) * record.number) / record.openPrice;
        return (
          <Green value={diffVal}>
            {income} <span>{rateOfReturn}%</span>
          </Green>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: () => <Buy onClick={(e) => BuyBtn(e)}>Sell</Buy>,
    },
  ];

  const Hiscolumns = [
    {
      title: '#',
      dataIndex: 'id',
      width: '40px',
      render: (text: string) => <Order>{text}</Order>,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      width: '226px',
    },
    {
      title: 'Description',
      dataIndex: 'remark',
      width: '247px',
      render: (text: string) => <Date>{text}</Date>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text: string) => {
        const typeStr = formatType(text);
        return (
          <Type>
            <Circle value={typeStr} />
            <span>{typeStr}</span>
          </Type>
        );
      },
    },
    {
      title: 'Underlying',
      dataIndex: 'underlying',
      render: () => (
        <FlexAlign>
          <WalletImg src={Bit} />
          <span>BTC</span>
        </FlexAlign>
      ),
    },
    {
      title: 'Entry Price(USDC)',
      dataIndex: 'openPrice',
    },
    // {
    //   title: 'Exit Price(USDC)',
    //   dataIndex: 'exit',
    //   render: (text: number) => <Green value={text}>{text}</Green>,
    // },
    {
      title: 'Size',
      dataIndex: 'size',
    },
    // {
    //   title: 'Profit/Loss(USDC)',
    //   dataIndex: 'loss',
    //   render: (text: number, record: UserOrderListType) => {
    //     const spotPrice = Number(stockPrice);
    //     const diffVal = spotPrice - record.openPrice;
    //     const income = Math.abs(diffVal) * record.number;
    //     const rateOfReturn = (Math.abs(diffVal) * record.number) / record.openPrice;
    //     return (
    //       <Green value={diffVal}>
    //         {income} <span>{rateOfReturn}%</span>
    //       </Green>
    //     )
    //   },
    // },
  ];

  const BuyBtn = (e: any) => {
    e.stopPropagation();
    Notification({
      type: 'info',
      message: 'Coming soon',
    });
  };

  return (
    <Box>
      {curTab === 'Portfolio' ? (
        <ProductList
          columns={columns}
          dataSource={data.records}
          type="2"
          rowKey="orderId"
          pagination={{
            pageSize: orderListParams.size,
            current: orderListParams.page,
            total: data.total,
            onChange(page: number) {
              setOrderListParams((prev) => ({ ...prev, page }));
            },
          }}
        />
      ) : (
        <ProductList
          columns={Hiscolumns}
          dataSource={data.records}
          type="3"
          rowKey="orderId"
          pagination={{
            pageSize: orderListParams.size,
            current: orderListParams.page,
            total: data.total,
            onChange(page: number) {
              setOrderListParams((prev) => ({ ...prev, page }));
            },
          }}
        />
      )}
    </Box>
  );
}
