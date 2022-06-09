import styled from 'styled-components';
import { useModel } from 'umi';
import { useState, useEffect, useRef } from 'react';

import LogoHref from '@/assets/common/logo.svg';

type List = {
  isNow: boolean;
};
type selfProps = {
  setStep: Function;
  choiceIcon: string;
};

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
`;
const ImgBox = styled.div`
  width: 80px;
  height: 80px;
  background: #1e1e24;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WalletIcon = styled.img`
  width: 38px;
  height: 38px;
`;
const LogoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const DotList = styled.div`
  margin: 0 25px;
  display: flex;
`;
const Dot = styled.div<List>`
  width: 4px;
  height: 4px;
  border-radius: 4px;
  margin-right: 3px;
  background: ${({ isNow }) => (isNow ? '#fff' : '#8A8A98')};
  &:nth-of-type(3) {
    margin-right: 0;
  }
`;
const Connect = styled.div`
  margin-top: 24px;
  font-size: 16px;
  line-height: 24px;
  color: #f5f5ff;
  text-align: center;
`;
const Last = styled.div`
  margin-top: 64px;
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
  text-align: center;
`;
const Back = styled.span`
  color: #7c3efe;
  cursor: pointer;
`;

const StepTwo: React.FC<selfProps> = (props) => {
  const [nowId, setId] = useState(1);
  const { setStep } = props;
  const Dian = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];

  useEffect(() => {
    if (nowId > 3) {
      setId(1);
    }
    let timer = setInterval(() => {
      setId(nowId + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [nowId]);

  return (
    <div>
      <FlexWrap>
        <ImgBox>
          <WalletIcon src={props.choiceIcon} />
        </ImgBox>
        <DotList>
          {Dian.map((item, index) => {
            return <Dot key={index} isNow={item.id === nowId} />;
          })}
        </DotList>
        <ImgBox>
          <LogoIcon src={LogoHref} />
        </ImgBox>
      </FlexWrap>
      <Connect>
        <div>Connecting...</div>
        Please unlock your Solflare wallet.
      </Connect>
      <Last>
        Having trouble? <Back onClick={() => setStep('1')}>Go back</Back>
      </Last>
    </div>
  );
};
export default StepTwo;
