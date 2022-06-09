import styled from 'styled-components';
import { useModel, history } from 'umi';

import Notification from '@/components/common/Notification';
import { socialList } from '@/layouts/socialList';
import placeOrder from '@/utils/wallet/contract/placeOrder';
import { getAccountInfo } from '@/utils/wallet/JsonRpc';

import circular1 from '@/assets/HomePage/circular1.png';
import circular2 from '@/assets/HomePage/circular2.png';
import circular3 from '@/assets/HomePage/circular3.png';
import circular4 from '@/assets/HomePage/circular4.png';
import { PublicKey } from '@solana/web3.js';

type MobileJudge = {
  isMobile: boolean;
};

type CircularImgProps = {
  top: number;
  right: number;
  src: any;
  width: number;
  height: number;
};

const PageWrap = styled.div<MobileJudge>`
  width: 100%;
  position: relative;
  ${({ isMobile }) =>
    isMobile
      ? {
          height: '870px',
        }
      : {
          height: '808px',
        }}
`;

const Left = styled.div<MobileJudge>`
  position: absolute;
  z-index: 2;
  ${({ isMobile }) =>
    isMobile
      ? {
          top: '66px',
          width: '100%',
        }
      : {
          top: '80px',
          width: '800px',
        }}
`;

const Title = styled.div<MobileJudge>`
  font-family: Poppins-Bold;
  font-style: normal;
  font-weight: bold;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #ffffff;
  ${({ isMobile }) =>
    isMobile
      ? {
          fontSize: '40px',
          lineHeight: '48px',
        }
      : {
          fontSize: '96px',
          lineHeight: '104px',
        }}
`;

const Des = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #a9a9b7;
  margin-top: 8px;
`;

const AchievementsWrap = styled.div<MobileJudge>`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px);
  border-radius: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  flex-wrap: wrap;
  ${({ isMobile }) =>
    isMobile
      ? {
          margin: '24px 0 40px 0',
          height: 'auto',
          width: '100%',
          padding: '20px',
        }
      : {
          margin: '48px 0 60px 0',
          height: '142px',
          width: '650px',
          padding: '0 40px',
        }}
  > div:last-child {
    margin-right: 0;
  }
  > div:nth-child(1),
  > div:nth-child(3) {
    ${({ isMobile }) =>
      isMobile
        ? {
            width: '46%',
          }
        : {}}
  }
  > div:nth-child(2),
  > div:nth-child(4) {
    ${({ isMobile }) =>
      isMobile
        ? {
            width: '54%',
          }
        : {}}
  }
  > div:nth-child(3),
  > div:nth-child(4) {
    margin-bottom: 0px;
  }
`;

const OneAchievements = styled.div<MobileJudge>`
  ${({ isMobile }) =>
    isMobile
      ? {
          width: '50%',
          marginBottom: '24px',
        }
      : {
          width: 'auto',
          marginRight: '80px',
        }}
`;

const AchievementResult = styled.div`
  font-family: Poppins-Bold;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 42px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #ffffff;
  margin-bottom: 12px;
`;

const AchievementDes = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #a9a9b7;
`;

const InteractionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const BtnList = styled.div<MobileJudge>`
  display: flex;
  align-items: center;
  ${({ isMobile }) =>
    isMobile
      ? {
          marginBottom: '20px',
          justifyContent: 'space-between',
          width: '100%',
        }
      : {}}
`;
const ContactList = styled.div<MobileJudge>`
  display: flex;
  align-items: center;
`;
const LaunchAppBtn = styled.div<MobileJudge>`
  height: 58px;
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  border-radius: 12px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 58px;
  text-align: center;
  cursor: pointer;
  color: #ffffff;
  margin-right: 20px;
  ${({ isMobile }) =>
    isMobile
      ? {
          flex: '1',
        }
      : {
          width: '185px',
        }}
`;

const ReadBtn = styled.div<MobileJudge>`
  height: 58px;
  text-align: center;
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  padding: 1px;
  border-radius: 12px;
  box-sizing: border-box;
  cursor: pointer;
  ${({ isMobile }) =>
    isMobile
      ? {
          flex: '1',
        }
      : {
          marginRight: '20px',
          width: '180px',
        }}
`;

const ReadIn = styled.div`
  background: #2c2c35;
  border-radius: 12px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #f5f5ff;
  height: 56px;
  line-height: 56px;
`;

const OneConteactWrap = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  box-sizing: border-box;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
`;

const ContractImg = styled.img``;

const Right = styled.div<MobileJudge>`
  position: absolute;
  z-index: 1;
  ${({ isMobile }) =>
    isMobile
      ? {
          top: '-18px',
          right: '0px',
          width: '400px',
          height: '400px',
        }
      : {
          top: '18px',
          right: '-50px',
          width: '700px',
          height: '700px',
        }}
`;

const CircularImg = styled.img<CircularImgProps>`
  position: absolute;
  top: ${({ top }) => top}px;
  right: ${({ right }) => right}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export default function HomePageOverview() {
  const { isMobile } = useModel('useWindowSize');

  const achievementsList = [
    {
      result: '$100B+',
      des: 'Trade Volume',
    },
    {
      result: '100M+',
      des: 'All Time Trades',
    },
    {
      result: '5000+',
      des: 'Community Delegates',
    },
  ];

  const circularImgList = [
    {
      src: circular1,
      top: 0,
      right: isMobile ? -120 : 0,
      width: isMobile ? 400 : 700,
      height: isMobile ? 400 : 700,
    },
    {
      src: circular2,
      top: isMobile ? 30 : 0,
      right: isMobile ? 249 : 0,
      width: 20,
      height: 20,
    },
    {
      src: circular3,
      top: 59,
      right: 550,
      width: 20,
      height: 20,
    },
    {
      src: circular4,
      top: isMobile ? 435 : 600,
      right: isMobile ? 73 : 596,
      width: 40,
      height: 40,
    },
  ];

  const toSocial = (e: any) => {
    if (e) {
      window.open(e, '_black');
    } else {
      Notification({
        type: 'info',
        message:
          'Will open discord and medium later. Don’t need to connect now',
      });
    }
  };

  return (
    <PageWrap isMobile={isMobile}>
      <Left isMobile={isMobile}>
        <Title isMobile={isMobile}>
          Reinventing
          <br />
          Finance
        </Title>
        <Des>A growing network of DeFi Apps.</Des>
        <AchievementsWrap isMobile={isMobile}>
          {achievementsList.map((item, index) => {
            return (
              <OneAchievements key={index} isMobile={isMobile}>
                <AchievementResult>{item.result}</AchievementResult>
                <AchievementDes>{item.des}</AchievementDes>
              </OneAchievements>
            );
          })}
        </AchievementsWrap>
        <InteractionWrap>
          <BtnList isMobile={isMobile}>
            <LaunchAppBtn
              isMobile={isMobile}
              onClick={() => {
                history.push('/launchApp');
              }}
            >
              Launch App &gt;
            </LaunchAppBtn>
            <ReadBtn isMobile={isMobile}>
              <ReadIn
                onClick={() =>
                  window.open(
                    'https://hey-crypto-kash.gitbook.io/kash-litepaper/',
                    '_black',
                  )
                }
              >
                Read Docs
              </ReadIn>
            </ReadBtn>
          </BtnList>
          <ContactList isMobile={isMobile}>
            {socialList.map((item, index) => {
              return (
                <OneConteactWrap
                  onClick={() => {
                    toSocial(item.href);
                  }}
                  key={index}
                >
                  <ContractImg src={item.icon} />
                </OneConteactWrap>
              );
            })}
          </ContactList>
        </InteractionWrap>
      </Left>
      <Right isMobile={isMobile}>
        {circularImgList.map((item, index) => {
          return (
            <CircularImg
              src={item.src}
              right={item.right}
              top={item.top}
              width={item.width}
              height={item.height}
              key={index}
            />
          );
        })}
      </Right>
    </PageWrap>
  );
}
