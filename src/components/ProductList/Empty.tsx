import styled from 'styled-components';
import { useModel } from 'umi';

import EmptyIcon from '@/assets/common/empty.png';

type MobileJudge = {
  isMobile: boolean;
};

const HomePageWrap = styled.div<MobileJudge>`
  box-sizing: border-box;
  margin-top: 24px;

  ${({ isMobile }) =>
    isMobile
      ? {
          width: '100%',
        }
      : {
          width: '1280px',
        }}
`;
const HomePageCont = styled.div`
  background: #1e1e24;
  border-radius: 20px;
  padding: 20px;
  color: #70707c;
  text-align: center;
  padding: 121px 0;
`;
const Icon = styled.img`
  width: 120px;
  height: 120px;
`;
const Des = styled.div`
  margin-top: 20px;
`;

export default function Empty() {
  const { isMobile } = useModel('useWindowSize');

  return (
    <HomePageWrap isMobile={isMobile}>
      <HomePageCont>
        <Icon src={EmptyIcon} />
        <Des>Sorry, there is no product suitable for you at the moment</Des>
      </HomePageCont>
    </HomePageWrap>
  );
}
