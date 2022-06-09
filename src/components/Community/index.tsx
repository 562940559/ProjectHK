import styled from 'styled-components';
import { useModel } from 'umi';

import Content from './Content';

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
          padding: '0 20px 120px 20px',
        }
      : {
          width: '1440px',
          padding: '0 80px 120px 80px',
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
      right: -237,
      top: -283,
      width: '890px',
      height: '890px',
    },
  ];

  const PcList = CircularBgList.map((item, index) => {
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
  });

  return (
    <HomePageWrap isMobile={isMobile}>
      {isMobile ? (
        <CircularBg
          left={-110}
          top={-244}
          right={undefined}
          width="625px"
          height="625px"
        />
      ) : (
        PcList
      )}
      <HomePageCont isMobile={isMobile}>
        <Content />
      </HomePageCont>
    </HomePageWrap>
  );
}
