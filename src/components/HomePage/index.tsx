import styled from 'styled-components';
import { useModel } from 'umi';

import HomePageOverview from './Overview';
import HomePageDex from './Des';

type MobileJudge = {
  isMobile: boolean;
};

type CircularBgProps = {
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  width: number;
  height: number;
};

const HomePageWrap = styled.div<MobileJudge>`
  min-height: 100vh;
  position: relative;
  background: #111113;
  box-sizing: border-box;
  padding-top: ${({ isMobile }) => (isMobile ? '68px' : '78px')};
  padding-bottom: ${({ isMobile }) => (isMobile ? '277px' : '141px')};
  overflow: hidden;
`;

const CircularBg = styled.div<CircularBgProps>`
  position: absolute;
  background: linear-gradient(147.77deg, #dd81ff 14.56%, #1238ff 86.63%);
  opacity: 0.3;
  filter: blur(240px);
  z-index: 1;
  ${({ top }) => (top !== undefined ? { top: top + 'px' } : null)}
  ${({ left }) => (left !== undefined ? { left: left + 'px' } : null)}
  ${({ right }) => (right !== undefined ? { right: right + 'px' } : null)}
  ${({ width }) => (width ? { width: width + 'px' } : null)}
  ${({ height }) => (height ? { height: height + 'px' } : null)}
`;

const HomePageCont = styled.div<MobileJudge>`
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  ${({ isMobile }) =>
    isMobile
      ? {
          width: '100%',
          padding: '0 20px 100px 20px',
        }
      : {
          width: '1440px',
          padding: '0 80px 160px 80px',
        }}
`;

export default function HomePage() {
  const { isMobile } = useModel('useWindowSize');

  const CircularBgList = [
    {
      left: -197,
      top: -327,
      width: 823,
      height: 816,
    },
    {
      right: -203,
      top: -253,
      width: 890,
      height: 890,
    },
    {
      right: -573,
      top: 708,
      width: 831,
      height: 824,
    },
  ];

  const MobileBgList = [
    {
      left: -87,
      top: -239,
      width: 549,
      height: 545,
    },
    {
      right: -426,
      top: 760,
      width: 831,
      height: 824,
    },
  ];

  const PcList = CircularBgList.map((item, index) => {
    return (
      <CircularBg
        left={item.left}
        right={item.right}
        top={item.top}
        width={item.width}
        height={item.height}
        key={index}
      />
    );
  });

  const MobileList = MobileBgList.map((item, index) => {
    return (
      <CircularBg
        left={item.left}
        right={item.right}
        top={item.top}
        width={item.width}
        height={item.height}
        key={index}
      />
    );
  });

  return (
    <HomePageWrap isMobile={isMobile}>
      {isMobile ? MobileList : PcList}
      <HomePageCont isMobile={isMobile}>
        <HomePageOverview />
        <HomePageDex />
      </HomePageCont>
    </HomePageWrap>
  );
}
