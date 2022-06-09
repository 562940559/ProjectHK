import { useState } from 'react';
import styled from 'styled-components';
import { useModel } from 'umi';

import Relevant from './Relevant';
import UserProduct from './UserProduct';

type MobileJudge = {
  isMobile: boolean;
};

type Change = {
  nowId: boolean;
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
          padding: '40px 80px 120px 80px',
        }}
`;

const TabList = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  margin-top: 40px;
`;

const TabItem = styled.div<Change>`
  margin-right: 24px;
  color: ${({ nowId }) => (nowId ? '#F5F5FF' : '#70707C')};
  cursor: pointer;
`;

export default function QuestionResult() {
  const { isMobile } = useModel('useWindowSize');
  const [curTab, setCurTab] = useState<'Portfolio' | 'History' | string>(
    'Portfolio',
  );

  const list = [
    {
      name: 'Portfolio',
      id: 'Portfolio',
    },
    {
      name: 'History',
      id: 'History',
    },
  ];

  return (
    <HomePageWrap isMobile={isMobile}>
      <HomePageCont isMobile={isMobile}>
        <Relevant />
        <TabList>
          {list.map((item) => {
            return (
              <TabItem
                nowId={curTab === item.id}
                key={item.id}
                onClick={() => setCurTab(item.id)}
              >
                {item.name}
              </TabItem>
            );
          })}
        </TabList>
        <UserProduct curTab={curTab} />
      </HomePageCont>
    </HomePageWrap>
  );
}
