import styled from 'styled-components';
import { useModel, history } from 'umi';

import StructProduct from './ProductList';

type MobileJudge = {
  isMobile: boolean;
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
          padding: '40px 20px',
        }
      : {
          width: '1440px',
          padding: '40px 80px 140px 80px',
        }}
`;

const Back = styled.div`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
  margin-bottom: 12px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

const BigTitle = styled.div`
  font-weight: 500;
  font-size: 40px;
  line-height: 48px;
  color: #ffffff;
  margin-bottom: 24px;
`;

export default function QuestionResult() {
  const { isMobile } = useModel('useWindowSize');

  const goBack = () => {
    history.goBack();
  };

  return (
    <HomePageWrap isMobile={isMobile}>
      <HomePageCont isMobile={isMobile}>
        <Back onClick={() => goBack()}>&lt; Back</Back>
        <BigTitle>Structured Products</BigTitle>
        <StructProduct />
      </HomePageCont>
    </HomePageWrap>
  );
}
