import styled from 'styled-components';
import { useModel } from 'umi';

import serum from '@/assets/HomePage/serum.png';
import psyOptions from '@/assets/HomePage/psyOptions.png';
import Solana from '@/assets/HomePage/Solana.png';
import BB from '@/assets/HomePage/BB.png';
import doge from '@/assets/HomePage/doge.png';
import ling from '@/assets/HomePage/ling.png';

type OneItemProps = {
  src: any;
  imgWidth: any;
  mobileWidth: any;
  isMobile: boolean;
};

type MobileJudge = {
  isMobile: boolean;
};

const PageWrap = styled.div`
  width: 100%;
  position: relative;
`;

const DesWrap = styled.div<MobileJudge>`
  text-align: left;
  margin-bottom: 40px;
  .oneAb {
    ${({ isMobile }) =>
      isMobile
        ? {
            position: 'absolute',
            'z-index': '999',
            top: '36px',
          }
        : {}}
  }
`;

const LittleTitle = styled.div<MobileJudge>`
  width: 168px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  background: linear-gradient(to right, #dd81ff, #491cff);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: ${({ isMobile }) => (isMobile ? '172px' : '8px')};
`;

const BigTitle = styled.div<MobileJudge>`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: ${({ isMobile }) => (isMobile ? '40px' : ' 56px')};
  line-height: ${({ isMobile }) => (isMobile ? '48px' : ' 84px')};
  color: #f5f5ff;
  width: ${({ isMobile }) => (isMobile ? 'auto' : '563px')};
  margin-bottom: 28px;
`;

const Des = styled.div<MobileJudge>`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #a0a0a1;
  width: ${({ isMobile }) => (isMobile ? 'auto' : '600px')};
`;

const Partner = styled.div<MobileJudge>`
  margin-top: ${({ isMobile }) => (isMobile ? '86px' : '160px')};
`;

const Heng = styled.div`
  width: 107px;
  height: 6px;
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  margin-bottom: 12px;
`;

const ListWrap = styled.div<MobileJudge>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: ${({ isMobile }) => (isMobile ? '20px' : '40px')};
`;

const OneItem = styled.div<MobileJudge>`
  box-sizing: border-box;
  padding: 4px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px);
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    .OneIn {
      background: linear-gradient(
        113.25deg,
        rgba(221, 129, 255, 0.2) 15.03%,
        rgba(73, 28, 255, 0.2) 84.97%
      );
    }
  }
  &:nth-of-type(2n) {
    margin-right: 0;
  }
  ${({ isMobile }) =>
    isMobile
      ? {
          width: '48%',
          marginBottom: '20px',
          marginRight: '12px',
          height: '103px',
        }
      : {
          width: '220px',
          height: '140px',
        }}
`;

const OneIn = styled.div`
  background: #111113;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemImg = styled.img<OneItemProps>`
  width: ${(props) => (props.isMobile ? props.mobileWidth : props.imgWidth)}px;
`;
const LingIcon = styled.img<MobileJudge>`
  position: absolute;
  ${({ isMobile }) =>
    isMobile
      ? {
          width: '350px',
          height: '304.12px',
          right: '-84px',
          top: '-152px',
        }
      : {
          width: '549.94px',
          height: '477.85px',
          right: '0',
          top: '-17px',
        }}
`;

export default function HomePageDex() {
  const { isMobile } = useModel('useWindowSize');

  const itemList = [
    {
      imgSrc: serum,
      imgWidth: 126,
      mobileWidth: 92.63,
    },
    {
      imgSrc: psyOptions,
      imgWidth: 146,
      mobileWidth: 107.18,
    },
    {
      imgSrc: Solana,
      imgWidth: 150,
      mobileWidth: 107.18,
    },
    {
      imgSrc: BB,
      imgWidth: 125.3,
      mobileWidth: 103.94,
    },
    {
      imgSrc: doge,
      imgWidth: 149.5,
      mobileWidth: 109.8,
      path: 'https://cryptodoge.cc/',
    },
  ];

  return (
    <PageWrap>
      <DesWrap isMobile={isMobile}>
        <LittleTitle isMobile={isMobile}>Built-On-Solana</LittleTitle>
        <BigTitle className="oneAb" isMobile={isMobile}>
          A growing network of DeFi Apps.
        </BigTitle>
        <Des isMobile={isMobile}>
          We at 1KASH are working towards a world where the complete range of
          financial services can be automated and decentralized using
          Distributed Ledger Technologies and accessed through a single app that
          is quick, low cost, and secure. An app owned by the users and through
          which they exercise full control and custody of their money,
          investments, and property. And a world where regulation and compliance
          has caught up to advances in technology and provide safeguards to
          users without infringing on basic freedoms and rights of property
          ownership
        </Des>
      </DesWrap>
      <LingIcon isMobile={isMobile} src={ling} />
      <Partner isMobile={isMobile}>
        <Heng />
        <BigTitle isMobile={isMobile}>Partner</BigTitle>
        <ListWrap isMobile={isMobile}>
          {itemList.map((item, index) => {
            return (
              <OneItem
                key={index}
                isMobile={isMobile}
                onClick={() =>
                  item.path ? window.open(item.path, '_blank') : ''
                }
              >
                <OneIn className="OneIn">
                  <ItemImg
                    src={item.imgSrc}
                    imgWidth={item.imgWidth}
                    mobileWidth={item.mobileWidth}
                    isMobile={isMobile}
                  />
                </OneIn>
              </OneItem>
            );
          })}
        </ListWrap>
      </Partner>
    </PageWrap>
  );
}
