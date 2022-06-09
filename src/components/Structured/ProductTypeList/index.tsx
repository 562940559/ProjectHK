import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useModel, useLocation } from 'umi';

import ProductList from '@/components/ProductList';
import Pair from './Pair';
import BuyModal from '@/components/BuyModal';
import { getProductList } from '@/services/product';

import Bit from '@/assets/structProduct/bitcoin.svg';

type MobileJudge = {
  isMobile: boolean;
};

type Value = {
  value: any;
};

type ShowType = {
  isShow: boolean;
};

const HomePageWrap = styled.div<MobileJudge>`
  min-height: 100vh;
  font-family: 'Poppins';
  position: relative;
  background: #111113;
  box-sizing: border-box;
  padding-top: ${({ isMobile }) => (isMobile ? '68px' : '78px')};
  padding-bottom: ${({ isMobile }) => (isMobile ? '277px' : '141px')};
  overflow: hidden;
  ${({ isMobile }) =>
    isMobile
      ? {
          width: '100%',
        }
      : {
          minWidth: '1440px',
        }}
`;

const HomePageCont = styled.div<MobileJudge>`
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  ${({ isMobile }) =>
    isMobile
      ? {
          width: '100%',
          padding: '40px 20px 60px 20px',
        }
      : {
          width: '1440px',
          padding: '40px 80px 140px 80px',
        }}
`;
const Green = styled.div<Value>`
  color: ${(props) => (props.value < 0 ? '#FD4438' : '#15FFAB')};
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
const Mask = styled.div<ShowType>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
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

export default function QuestionResult() {
  const [isShow, setIsShow] = useState(false);
  const [nowPage, setPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);
  const [modalData, setModalData] = useState({});

  const { isMobile } = useModel('useWindowSize');
  const { stockPrice, refreshStockPrice } = useModel('useSerum');
  const location: any = useLocation();

  useEffect(() => {
    if (!isMobile) {
      refreshStockPrice();
    }
  }, [isMobile]);

  const changeShow = (e: boolean) => {
    setIsShow(e);
  };

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
      width: '247px',
    },
    {
      title: 'Description',
      dataIndex: 'remark',
      width: '268px',
      render: (text: string) => <Date>{text}</Date>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text: string) => (
        <Type>
          <Circle value={text === 'COVER_CALLS' ? 'CALL' : 'PUT'} />
          <span>{text === 'COVER_CALLS' ? 'CALL' : 'PUT'}</span>
        </Type>
      ),
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
      title: 'Underlying Price(USDC)',
      render: () => (
        <Green value={stockPrice === false ? 0 : stockPrice}>
          {stockPrice === false ? 'loading...' : stockPrice}
        </Green>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text: any, record: any) => (
        <Buy onClick={(e) => BuyBtn(e, record)}>Buy</Buy>
      ),
    },
  ];

  const BuyBtn = (e: any, record: any) => {
    e.stopPropagation();
    setIsShow(true);
    setModalData(record);
  };

  // 页面发生变化时
  const pageChange = (val: any) => {
    setPage(val);
  };

  const getDataSource = useCallback(async () => {
    const { data } = await getProductList({
      page: nowPage,
      size: 2,
      token: 'BTC/USDC',
      type: location.query.type === 'CALL' ? 'COVER_CALLS' : 'COVER_Puts',
    });
    const requestRes = data?.records;
    setDataSource(requestRes);
    setPageTotal(data.total);
  }, [nowPage]);

  useEffect(() => {
    getDataSource();
  }, [nowPage]);

  return (
    <HomePageWrap isMobile={isMobile}>
      <HomePageCont isMobile={isMobile}>
        <Pair type={location.query.type} />
        <ProductList
          columns={columns}
          dataSource={dataSource}
          type="1"
          rowKey="id"
          pagination={{
            pageSize: 2,
            current: nowPage,
            total: pageTotal,
            onChange(page: number) {
              setPage(page);
            },
          }}
        />
      </HomePageCont>
      <Mask isShow={isShow}>
        <BuyModal
          changeShow={changeShow}
          isShow={isShow}
          modalData={modalData}
        />
      </Mask>
    </HomePageWrap>
  );
}
