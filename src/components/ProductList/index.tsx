import styled from 'styled-components';
import { useModel } from 'umi';
import { useState } from 'react';
import { Table } from 'antd';

import Notification from '@/components/common/Notification';
import BuyModal from '@/components/BuyModal';
import ProductDraw from '@/components/ProductDraw';

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

interface selfProps {
  columns: any;
  dataSource: any;
  pagination: any;
  type: string;
  rowKey: string;
  pageChange?: Function;
}

const HomePageWrap = styled.div<MobileJudge>`
  box-sizing: border-box;
  display: inline-block;
  font-family: 'Poppins';
  ${({ isMobile }) =>
    isMobile
      ? {
          width: '100%',
          marginTop: '40px',
        }
      : {
          width: '1280px',
          marginTop: '24px',
        }}
`;
const HomePageCont = styled.div`
  background: #1e1e24;
  border-radius: 20px;
  padding: 20px;
  color: #fff;
  margin-bottom: 24px;
  &:nth-last-of-type(1) {
    margin-bottom: 0;
  }
`;
const Green = styled.div<Value>`
  color: ${(props) => (props.value < 0 ? '#FD4438' : '#15FFAB')};
  span {
    font-size: 12px;
  }
`;
const Date = styled.div`
  color: #a9a9b7;
`;
const Box = styled.div``;
const Name = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #f5f5ff;
  font-weight: 500;
`;
const Des = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
  padding-bottom: 16px;
  border-bottom: 1px solid #2c2c35;
`;
const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
`;
const Left = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #70707c;
`;
const Price = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #f5f5ff;
`;
const MobileBuy = styled.div`
  height: 40px;
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  border-radius: 12px;
  font-size: 14px;
  line-height: 40px;
  color: #f5f5ff;
  text-align: center;
  margin-top: 16px;
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
  background: ${(props) =>
    props.value === 'COVER_CALLS' ? '#06D7F6' : '#FFF736'};
  margin-right: 6px;
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
const FlexAlign = styled.div`
  display: flex;
  align-items: center;
`;
const WalletImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;
const TableWrap = styled(Table)<selfProps>`
  .ant-table-thead > tr > th {
    border-bottom: none;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #a9a9b7;
    padding: 0;
    padding-left: 5.4px;
    background: #1e1e24;
  }
  .ant-empty-description {
    color: #a9a9b7;
  }
  .ant-table-tbody > tr {
    cursor: pointer;
  }
  .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background: #1e1e24 !important;
  }
  .ant-table-tbody > tr > td {
    padding: 12px 0;
    background: #1e1e24;
    border-bottom: none;
    font-size: 14px;
    line-height: 22px;
    color: #f5f5ff;
    padding-right: ${(props) =>
      props.type === '1' ? '103px' : props.type === '2' ? '63px' : '82px'};
    &:nth-of-type(1) {
      padding: 0 8px;
    }
    &:nth-last-of-type(1) {
      padding-right: 0;
    }
  }
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: #2c2c35;
  }

  .ant-pagination-item {
    background-color: transparent;
    border: none;
  }

  .ant-pagination-item:hover a {
    color: #a9a9b7;
  }
  .ant-pagination-item a {
    color: #a9a9b7;
  }
  .ant-pagination-item-active {
    border-color: #2c2c35;
    background: #2c2c35;
    border-radius: 4px;
  }
  .ant-pagination-next button,
  .ant-pagination-prev button {
    color: #a9a9b7;
  }
  .ant-pagination-next:hover button,
  .ant-pagination-prev:hover button {
    color: #a9a9b7;
  }
  .ant-pagination-jump-prev
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis,
  .ant-pagination-jump-next
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis {
    color: #a9a9b7;
  }
  .ant-pagination-item-link {
    border: none;
    background-color: transparent;
  }
  .ant-pagination-disabled .ant-pagination-item-link,
  .ant-pagination-disabled:hover .ant-pagination-item-link {
    color: #40404a;
  }
  .ant-table-pagination {
    justify-content: center;
  }
  .ant-table-pagination.ant-pagination {
    margin: 20px 0 0 0;
  }
`;
const ProductList: React.FC<selfProps> = (props) => {
  const [isShow, setIsShow] = useState(false);
  const [record, setRecord] = useState({});
  const [openIt, setOpen] = useState(false);
  const [stockPric, setStockPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalData, setModalData] = useState({});

  const { isMobile } = useModel('useWindowSize');
  const { pageChange } = props;

  const Detail = (item: any) => {
    setRecord(item);
    setOpen(true);
  };

  const BuyBtn = (e: any, item: any) => {
    e.stopPropagation();
    setIsShow(true);
    setModalData(item);
  };

  const SellBtn = (e: any) => {
    e.stopPropagation();
    Notification({
      type: 'info',
      message: 'Coming soon',
    });
  };

  const pagination = props.pagination
    ? {
        pageSize: 10,
        size: 'small',
        total: props.dataSource.length,
      }
    : props.pagination;

  // 分页发生变化
  const TableChange = (e: any) => {
    pageChange && pageChange(e.current);
  };

  // 点击行
  const clickRow = (record: any) => {
    setOpen(true);
    setRecord(record);
  };

  const changeShow = (e: boolean) => {
    setIsShow(e);
  };

  const OneType = props.dataSource.map((item: any, index: number) => {
    return (
      <HomePageCont key={item.id || index} onClick={() => Detail(item)}>
        <Name>{item.name}</Name>
        <Des>{item.des}</Des>
        <FlexWrap>
          <Left>Type</Left>
          <Type>
            <Circle value={item.type} />
            <span>{item.type === 'COVER_CALLS' ? 'CALL' : 'PUT'}</span>
          </Type>
        </FlexWrap>
        <FlexWrap>
          <Left>Underlying</Left>
          <FlexAlign>
            <WalletImg src={Bit} />
            <span>BTC</span>
          </FlexAlign>
        </FlexWrap>
        <FlexWrap>
          <Left>Underlying Price(USDC)</Left>
          <Green value={stockPric}>
            {isLoading === true ? 'loading...' : stockPric}
          </Green>
        </FlexWrap>
        <MobileBuy onClick={(e) => BuyBtn(e, item)}>Buy</MobileBuy>
      </HomePageCont>
    );
  });

  const TwoType = props.dataSource.map((item: any, index: number) => {
    return (
      <HomePageCont key={item.id || index} onClick={() => Detail(item)}>
        <Name>{item.name}</Name>
        <Des>{item.des}</Des>
        <FlexWrap>
          <Left>Type</Left>
          <Type>
            <Circle value={item.type} />
            <span>{item.type === 'COVER_CALLS' ? 'CALL' : 'PUT'}</span>
          </Type>
        </FlexWrap>
        <FlexWrap>
          <Left>Underlying</Left>
          <FlexAlign>
            <WalletImg src={Bit} />
            <span>BTC</span>
          </FlexAlign>
        </FlexWrap>
        <FlexWrap>
          <Left>Size</Left>
          <Price>{item.size}</Price>
        </FlexWrap>
        <FlexWrap>
          <Left>Profit/Loss(USDC)</Left>
          <Green value={item.loss}>
            {item.loss}
            <span>{item.loss > 0 ? '+' : '-'}5.68%</span>
          </Green>
        </FlexWrap>
        <MobileBuy onClick={(e) => SellBtn(e)}>Sell</MobileBuy>
      </HomePageCont>
    );
  });

  const ThreeType = props.dataSource.map((item: any, index: number) => {
    return (
      <HomePageCont key={item.id || index} onClick={() => Detail(item)}>
        <Name>{item.name}</Name>
        <Des>{item.des}</Des>
        <FlexWrap>
          <Left>Type</Left>
          <Type>
            <Circle value={item.type} />
            <span>{item.type === 'COVER_CALLS' ? 'CALL' : 'PUT'}</span>
          </Type>
        </FlexWrap>
        <FlexWrap>
          <Left>Underlying</Left>
          <FlexAlign>
            <WalletImg src={Bit} />
            <span>BTC</span>
          </FlexAlign>
        </FlexWrap>
        <FlexWrap>
          <Left>Entry Price(USDC)</Left>
          <Price>{item.entry}</Price>
        </FlexWrap>
        <FlexWrap>
          <Left>Exit Price(USDC)</Left>
          <Green value={item.exit}>{item.exit}</Green>
        </FlexWrap>
        <FlexWrap>
          <Left>Size</Left>
          <Price>{item.size}</Price>
        </FlexWrap>
        <FlexWrap>
          <Left>Profit/Loss(USDC)</Left>
          <Green value={item.loss}>
            {item.loss}
            <span>{item.loss > 0 ? '+' : '-'}5.68%</span>
          </Green>
        </FlexWrap>
      </HomePageCont>
    );
  });

  return (
    <HomePageWrap isMobile={isMobile}>
      {isMobile ? (
        <Box>
          {props.type == '1'
            ? OneType
            : props.type == '2'
            ? TwoType
            : ThreeType}

          <Mask isShow={isShow}>
            <BuyModal
              changeShow={changeShow}
              modalData={modalData}
              isShow={isShow}
            />
          </Mask>
        </Box>
      ) : (
        <HomePageCont>
          <TableWrap
            // pagination={pagination}
            // onChange={(e) => TableChange(e)}
            // rowKey="id"
            onRow={(record) => {
              return {
                onClick: () => {
                  clickRow(record);
                }, // 点击行
              };
            }}
            {...props}
          ></TableWrap>
        </HomePageCont>
      )}
      <ProductDraw
        setType={setOpen}
        record={record}
        openIt={openIt}
        type={props.type}
      />
    </HomePageWrap>
  );
};
export default ProductList;
