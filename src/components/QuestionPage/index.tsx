import styled from 'styled-components';
import { useModel } from 'umi';

import Warn from './Warning';
import Answer from './Answer';

type MobileJudge = {
  isMobile: boolean;
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
          padding: '60px 189px 140px 189px',
        }}
`;

export default function Questionnaire() {
  const { isMobile } = useModel('useWindowSize');

  return (
    <HomePageWrap isMobile={isMobile}>
      <Warn />
      <HomePageCont isMobile={isMobile}>
        <Answer />
      </HomePageCont>
    </HomePageWrap>
  );
}
