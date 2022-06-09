import styled from 'styled-components';
import { useModel } from 'umi';
import React from 'react';

import Close from '@/assets/question/close.png';

type MobileJudge = {
  isMobile: boolean;
};

type selfProps = {
  setType: Function;
};

const PopBox = styled.div<MobileJudge>`
  position: absolute;
  top: 50%;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  padding: 1px;
  border-radius: 12px;
  .scroll::-webkit-scrollbar {
    width: 0px;
  }
  ${({ isMobile }) =>
    isMobile
      ? {
          width: 'auto',
          transform: 'translateY(-50%)',
          margin: '0 20px',
        }
      : {
          width: '560px',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
`;
const InsideBox = styled.div`
  background: #111113;
  padding: 24px;
  border-radius: 12px;
  font-family: 'Poppins';
  max-height: 80vh;
  overflow-y: auto;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f5f5ff;
`;
const CloseImg = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const Info = styled.div`
  margin: 24px 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
  text-align: left;
`;
const OkBtn = styled.div`
  height: 48px;
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  border-radius: 8px;
  line-height: 48px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
`;

const Popup: React.FC<selfProps> = (props) => {
  const { setType } = props;
  const { isMobile } = useModel('useWindowSize');

  const clickBtn = (e: boolean) => {
    setType(e);
  };

  return (
    <PopBox isMobile={isMobile}>
      <InsideBox className="scroll">
        <Top>
          <Title>Warning</Title>
          <CloseImg src={Close} onClick={() => clickBtn(false)} />
        </Top>
        <Info>
          No representation or warranty is made concerning any aspect
          of1Sol,including its availability,quality,safety,or accessibility.
          Access to and use 1Sol is entirely at users'own risk and could lead to
          tangible losses.Therefore,users take full responsibility for their use
          of the 1Sol, including participation in trading. liquidity providing,
          lending,borrowing,purchasing,or selling of any
          products,including,without limitation of addresses,keys,
          accounts,tokens,coins,options,and other financial or non- financial
          assets.
        </Info>
        <OkBtn onClick={() => clickBtn(false)}>ok</OkBtn>
      </InsideBox>
    </PopBox>
  );
};

export default Popup;
