import styled from 'styled-components';
import { useModel, history } from 'umi';
import Notification from '@/components/common/Notification';

import Risk from '@/assets/launchApp/risk.png';
import Product from '@/assets/launchApp/product.png';
import Aggregator from '@/assets/launchApp/aggregator.png';

type OneItemProps = {
  src: any;
};

type MobileJudge = {
  isMobile: boolean;
};

type BtnType = {
  wait: boolean;
};

const PageWrap = styled.div`
  width: 100%;
`;

const ListWrap = styled.div<MobileJudge>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: ${({ isMobile }) => (isMobile ? '24px' : '')};
  position: relative;
`;
const OutBox = styled.div<MobileJudge>`
  background-image: linear-gradient(
    106.69deg,
    #2d2d2f 4.31%,
    rgba(255, 255, 255, 0) 45.94%,
    rgba(21, 28, 46, 0) 64.91%,
    rgba(21, 28, 46, 0.1) 100%
  );
  padding: 3px;
  border-radius: 20px;
  box-sizing: border-box;
  ${({ isMobile }) =>
    isMobile
      ? {
          width: '100%',
          marginBottom: '24px',
        }
      : {
          width: '410.7px',
        }}
  &:hover {
    background-image: linear-gradient(
      113.25deg,
      rgba(221, 129, 255, 0.2) 15.03%,
      rgba(73, 28, 255, 0.2) 84.97%
    );
    cursor: pointer;
    .btnChange {
      background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
      color: #f5f5ff;
    }
    .itemChange {
      background: linear-gradient(
        113.25deg,
        rgba(221, 129, 255, 0.3) 15.03%,
        rgba(73, 28, 255, 0.3) 84.97%
      );
    }
  }
`;
const OneItem = styled.div<MobileJudge>`
  padding: ${(props) => (props.isMobile ? '20px' : '40px')};
  background: #18181a;
  backdrop-filter: blur(24px);
  border-radius: 20px;
`;

const ItemImg = styled.img<OneItemProps>`
  width: 270px;
  height: 260px;
`;

const ItemText = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #f5f5ff;
  margin-top: 32px;
`;
const ItemDes = styled.div`
  margin-top: 12px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #b9b9ba;
`;
const ItemBtn = styled.div<BtnType>`
  background: ${(props) =>
    props.wait
      ? '#1E1E24'
      : 'linear-gradient(113.25deg, rgba(221, 129, 255, 0.3) 15.03%, rgba(73, 28, 255, 0.3) 84.97%)'};
  border-radius: 12px;
  margin-top: 32px;
  padding: 17px 0;
  text-align: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => (props.wait ? '#70707C' : '#A9A9B7')};
`;
export default function Content() {
  const { isMobile } = useModel('useWindowSize');

  const itemList = [
    {
      imgSrc: Risk,
      name: 'Risk Questionaire',
      des: 'Explore your risk preferences and investment profile and source relevant structured products for your consideration',
      path: '/questionnaire',
    },
    {
      imgSrc: Product,
      name: 'Structured Products',
      des: 'View Available Directly,Ready to go investment products to match a wide  range of investor profiles',
      path: '/structProducts',
    },
    {
      imgSrc: Aggregator,
      name: 'Aggregator',
      des: 'Coming soon',
    },
  ];

  const clickItem = (item: any) => {
    if (item.path) {
      history.push(item.path);
    } else {
      Notification({
        type: 'info',
        message: 'Coming soon',
      });
    }
  };

  return (
    <PageWrap>
      <ListWrap isMobile={isMobile}>
        {itemList.map((item, index) => {
          return (
            <OutBox isMobile={isMobile} key={index}>
              <OneItem
                className="itemChange"
                isMobile={isMobile}
                onClick={() => clickItem(item)}
              >
                <ItemImg src={item.imgSrc} />
                <ItemText>{item.name}</ItemText>
                <ItemDes>{item.des}</ItemDes>
                <ItemBtn
                  wait={index === 2}
                  className={item.path ? 'btnChange' : ''}
                >
                  {item.path ? 'Enter' : 'Coming Soon'}
                </ItemBtn>
              </OneItem>
            </OutBox>
          );
        })}
      </ListWrap>
    </PageWrap>
  );
}
