import styled from 'styled-components';
import { useModel } from 'umi';

import Notification from '@/components/common/Notification';

import Box from '@/assets/community/box.png';
import sphere from '@/assets/community/Sphere.png';
import Twitter from '@/assets/community/Twitter.png';
import discord from '@/assets/community/discord.png';
import medium from '@/assets/community/medium.png';
import dark from '@/assets/community/darkArrow.svg';
import light from '@/assets/community/lightArrow.svg';

type OneItemProps = {
  src: any;
};

type MobileJudge = {
  isMobile: boolean;
};

type Arrow = {
  bg: any;
  hoverbg: any;
  isMobile: boolean;
};

const PageWrap = styled.div`
  width: 100%;
`;

const DesWrap = styled.div`
  text-align: left;
`;
const PcEnd = styled.div`
  margin-top: 74px;
  display: flex;
  align-items: center;
`;

const BigTitle = styled.div<MobileJudge>`
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  font-size: ${({ isMobile }) => (isMobile ? '40px' : ' 96px')};
  line-height: ${({ isMobile }) => (isMobile ? '48px' : ' 104px')};
  padding-top: ${({ isMobile }) => (isMobile ? '410px' : '')};
  color: white;
  margin-bottom: 12px;
`;

const Des = styled.div<MobileJudge>`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #a9a9b7;
  width: ${({ isMobile }) => (isMobile ? 'auto' : '615px')};
`;
const Heng = styled.div`
  margin-top: 34px;
  width: 114px;
  height: 1px;
  background: #fff;
`;
const Sphere = styled.img`
  margin-top: 69px;
  width: 30px;
  height: 30px;
`;
const RightBox = styled.img<MobileJudge>`
  ${({ isMobile }) =>
    isMobile
      ? {
          position: 'absolute',
          width: '460px',
          height: '373.27px',
          right: '0',
          top: '0',
        }
      : {
          width: '559.84px',
          height: '454.29px',
          marginLeft: '60px',
        }}
`;
const Join = styled.div<MobileJudge>`
  font-size: ${({ isMobile }) => (isMobile ? '40px' : ' 56px')};
  line-height: ${({ isMobile }) => (isMobile ? '48px' : ' 84px')};
  margin-top: ${({ isMobile }) => (isMobile ? '80px' : '-5px')};
  width: ${({ isMobile }) => (isMobile ? '' : '408px')};
  color: #ffffff;
  font-weight: 700;
`;
const JoinDes = styled.div<MobileJudge>`
  font-size: 14px;
  line-height: 22px;
  margin-top: 12px;
  width: ${({ isMobile }) => (isMobile ? '' : '707px')};
  color: #b7b7b8;
  font-weight: 400;
  margin-bottom: 40px;
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
  ${({ isMobile }) =>
    isMobile
      ? {
          width: '100%',
          marginBottom: '24px',
        }
      : {
          width: '410.7px',
        }}
`;
const OneItem = styled.div<Arrow>`
  padding: 24px;
  background: #18181a;
  backdrop-filter: blur(24px);
  border-radius: 20px;
  background-image: url(${(props) => props.bg});
  background-position: ${({ isMobile }) =>
    isMobile ? '287px 21px' : '361.6px 21px'};
  background-repeat: no-repeat;
  &:hover {
    background-image: url(${(props) => props.hoverbg});
    cursor: pointer;
  }
`;

const ItemImg = styled.img<OneItemProps>`
  width: 88px;
  height: 88px;
`;

const ItemText = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #f5f5ff;
  margin-top: 16px;
`;
const ItemDes = styled.div`
  margin-top: 12px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #b9b9ba;
  height: 44px;
`;
const CircularBg = styled.div<MobileJudge>`
  position: absolute;
  background: linear-gradient(147.77deg, #dd81ff 14.56%, #1238ff 86.63%);
  opacity: 0.2;
  filter: blur(200px);
  width: 493px;
  height: 493px;
  z-index: 0;
  ${({ isMobile }) =>
    isMobile
      ? {
          left: '0',
          bottom: '51px',
        }
      : {
          right: '235px',
          top: '-156px',
        }}
`;
export default function Content() {
  const { isMobile } = useModel('useWindowSize');

  const itemList = [
    {
      imgSrc: Twitter,
      name: 'Twitter',
      des: 'Follow the latest news from 1Kash twitter',
      href: 'https://twitter.com/1Kash_official',
    },
    {
      imgSrc: discord,
      name: 'Discord',
      des: 'Ask questions and engage with the 1Kash Community',
      href: '',
    },
    {
      imgSrc: medium,
      name: 'Medium',
      des: 'Share ideas and participate in 1Kash Governance',
      href: '',
    },
  ];

  const toHref = (e: any) => {
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
    <PageWrap>
      <DesWrap>
        {isMobile ? (
          <div>
            <RightBox isMobile={isMobile} src={Box} />
            <BigTitle isMobile={isMobile}>COMMUNITY</BigTitle>
            <Des isMobile={isMobile}>
              The 1Kash community is an ecosystem of users, developers,
              designers, and educators
            </Des>
            <Heng />
          </div>
        ) : (
          <PcEnd>
            <div>
              <BigTitle isMobile={isMobile}>COMMUNITY</BigTitle>
              <Des isMobile={isMobile}>
                The 1Kash community is an ecosystem of users, developers,
                designers, and educators
              </Des>
              <Heng />
              <Sphere src={sphere} />
            </div>
            <RightBox isMobile={isMobile} src={Box} />
          </PcEnd>
        )}
      </DesWrap>
      <Join isMobile={isMobile}>Join The Conversation.</Join>
      <JoinDes isMobile={isMobile}>
        1Kash’s global and vibrant community drives the success of the Protocol.
        Join the conversation on Discord, Twitter, and Medium to stay up to date
        on the latest community news.
      </JoinDes>
      <ListWrap isMobile={isMobile}>
        {itemList.map((item, index) => {
          return (
            <OutBox
              isMobile={isMobile}
              key={index}
              onClick={() => toHref(item.href)}
            >
              <OneItem hoverbg={light} bg={dark} isMobile={isMobile}>
                <ItemImg src={item.imgSrc} />
                <ItemText>{item.name}</ItemText>
                <ItemDes>{item.des}</ItemDes>
              </OneItem>
            </OutBox>
          );
        })}
        <CircularBg isMobile={isMobile} />
      </ListWrap>
    </PageWrap>
  );
}
