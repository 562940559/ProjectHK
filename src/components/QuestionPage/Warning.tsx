import styled from 'styled-components';
import { useModel } from 'umi';
import { useState } from 'react';

import Close from '@/assets/question/close.png';

import Popup from './Popup';

type MobileJudge = {
  isMobile: boolean;
};

type WarnType = {
  isMobile: boolean;
  isWarn: boolean;
};

type ShowType = {
  isShow: boolean;
};

const Warn = styled.div<WarnType>`
  padding: ${({ isMobile }) => (isMobile ? '6px 44px 6px 20px' : '6px 0')};
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #1238ff 84.97%);
  border-radius: ${({ isMobile }) => (isMobile ? '' : '4px')};
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #ffffff;
  text-align: center;
  position: relative;
  text-indent: 2em;
  display: ${({ isWarn }) => (isWarn ? 'block' : 'none')};
`;
const More = styled.span`
  cursor: pointer;
`;
const CloseImg = styled.img<MobileJudge>`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 6px;
  right: ${({ isMobile }) => (isMobile ? '20px' : '28px')};
  cursor: pointer;
`;
const Mask = styled.div<ShowType>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
`;

export default function Warning() {
  const [isShow, setType] = useState(false);
  const [isWarn, setWarn] = useState(true);
  const { isMobile } = useModel('useWindowSize');

  const getType = (e: boolean) => {
    setType(e);
  };

  return (
    <div>
      <Warn isMobile={isMobile} isWarn={isWarn}>
        Warning:No representation or warranty is mae concerning any aspect of
        tis webside,including its availablity,quatity,safety,or acccessiblity..
        <More onClick={() => setType(true)}>More</More>
        <CloseImg
          src={Close}
          isMobile={isMobile}
          onClick={() => setWarn(false)}
        />
      </Warn>
      <Mask isShow={isShow}>
        <Popup setType={getType} />
      </Mask>
    </div>
  );
}
