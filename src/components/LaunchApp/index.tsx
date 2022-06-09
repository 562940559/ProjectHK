import styled from 'styled-components';
import { useModel } from 'umi';

import ModelList from './modelList';

type MobileJudge = {
  isMobile: boolean;
};

type CircularBgProps = {
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  width: string | undefined;
  height: string | undefined;
};

const HomePageWrap = styled.div<MobileJudge>`
  min-height: 100vh;
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

const CircularBg = styled.div<CircularBgProps>`
  position: absolute;
  background: linear-gradient(147.77deg, #dd81ff 14.56%, #1238ff 86.63%);
  opacity: 0.3;
  filter: blur(240px);
  z-index: 1;
  ${({ top }) => (top !== undefined ? { top: top + 'px' } : null)}
  ${({ left }) => (left !== undefined ? { left: left + 'px' } : null)}
  ${({ right }) => (right !== undefined ? { right: right + 'px' } : null)}
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const HomePageCont = styled.div<MobileJudge>`
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  ${({ isMobile }) =>
    isMobile
      ? {
          width: '100%',
          padding: '40px 20px',
        }
      : {
          width: '1440px',
          padding: '60px 80px 62px 80px',
        }}
`;

export default function HomePage() {
  const { isMobile } = useModel('useWindowSize');

  const CircularBgList = [
    {
      left: -197,
      top: -327,
      width: '823px',
      height: '816px',
    },
    {
      right: -383,
      top: -383,
      width: '890px',
      height: '890px',
    },
  ];

  return (
    <HomePageWrap isMobile={isMobile}>
      {CircularBgList.map((item, index) => {
        return isMobile ? null : (
          <CircularBg
            left={item.left}
            right={item.right}
            top={item.top}
            key={index}
            width={item.width}
            height={item.height}
          />
        );
      })}
      <HomePageCont isMobile={isMobile}>
        <ModelList />
      </HomePageCont>
    </HomePageWrap>
  );
}
