import styled from 'styled-components';
import { useState } from 'react';
import { useModel } from 'umi';

import { login } from '@/services/login';
import Notification from '@/components/common/Notification';
import { loginWithWallet } from '@/utils/wallet/tools';
import walletList from '@/utils/wallet/walletList';
import StepTwo from './StepTwo';

import Close from '@/assets/question/close.png';

const PopBox = styled.div`
  position: absolute;
  top: 50%;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  padding: 1px;
  border-radius: 12px;
  width: 440px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const InsideBox = styled.div`
  background: #111113;
  padding: 24px;
  border-radius: 12px;
  font-family: 'Poppins';
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
const Des = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #a9a9b7;
  margin-top: 24px;
`;
const Pink = styled.span`
  color: #c570fe;
`;
const ItemOut = styled.div`
  padding: 1px;
  border-radius: 8px;
  margin-bottom: 12px;
  box-sizing: border-box;
  &:hover {
    background-image: linear-gradient(
      113.25deg,
      #dd81ff 15.03%,
      #1238ff 84.97%
    );
  }
`;
const Item = styled.div`
  padding: 17px;
  background: #1e1e24;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
const Name = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #f5f5ff;
`;
const WalletIcon = styled.img`
  width: 38px;
  height: 38px;
`;
const Learn = styled.span`
  color: #924efe;
  cursor: pointer;
`;
const WalletList = styled.div`
  margin-top: 24px;
`;

const WalletSelect = (props: any) => {
  const [step, setStep] = useState('1');
  const [choiceIcon, setWImg] = useState('');

  const { setType } = props;
  const { updateUserInfo, updateToken } = useModel('useUser');

  const clickBtn = (e: boolean) => {
    setType(e);
    // 恢复到第一个步骤
    setStep('1');
  };

  // 连接钱包
  const walletConnect = async (walletInfo: {
    name: string;
    icon: string;
    website: string;
  }) => {
    const loginRes = await loginWithWallet(walletInfo, {
      end: walletConnectCb,
    });
    if (!loginRes) return;
  };

  /**
   * 进行接口登陆
   * @param wallet
   */
  const loginByInterface = async (wallet: walletPara) => {
    const walletType = walletList.filter((item) => item.name === wallet.name)[0]
      .walletType;
    const res = await login({
      message: wallet.message || '',
      signature: wallet.signature.signature,
      walletAddress: wallet.walletAddress || '',
      walletType: walletType,
    });
    clickBtn(false);
    if (res && res.data && res.code === '1') {
      Notification({
        type: 'success',
        message: 'wallet success',
        description: 'Wallet connected successfully',
      });
      updateUserInfo(res.data.userInfoVO);
      updateToken(res.data.token);
    }
  };

  /**
   * 连接钱包回调
   * @param endStatus 0 失败 1 连接成功 2 签名成功
   * @returns
   */
  interface walletPara {
    name: string;
    icon: string;
    website: string;
    walletAddress?: string;
    message?: string; // 原始信息
    signature?: any; // 签名
  }
  const walletConnectCb = async (endStatus: Number, wallet: walletPara) => {
    switch (endStatus) {
      case 1:
        const walletIcon = walletList.filter(
          (item) => item.name === wallet.name,
        )[0].icon;
        setStep('2');
        setWImg(walletIcon);
        break;
      case 2:
        await loginByInterface(wallet);
        break;
      default:
        setStep('1');
        Notification({
          type: 'info',
          message: 'wallet info',
          description: 'Connection failed',
        });
        break;
    }
  };

  return (
    <PopBox>
      <InsideBox>
        <Top>
          <Title>Connect Wallet</Title>
          <CloseImg src={Close} onClick={() => clickBtn(false)} />
        </Top>
        {step === '1' ? (
          <div>
            <Des>
              To Use Our Website,You Need To Connect A <Pink>Solana</Pink>{' '}
              Wallet.
            </Des>
            <WalletList>
              {walletList.map((walletInfo, index) => {
                return (
                  <ItemOut key={index}>
                    <Item onClick={() => walletConnect(walletInfo)}>
                      <Name>{walletInfo.name}</Name>
                      <WalletIcon src={walletInfo.icon} />
                    </Item>
                  </ItemOut>
                );
              })}
            </WalletList>
            <Des>
              First time using Solana? <Learn>Learn more</Learn>
            </Des>
          </div>
        ) : (
          <StepTwo choiceIcon={choiceIcon} setStep={setStep} />
        )}
      </InsideBox>
    </PopBox>
  );
};

export default WalletSelect;
