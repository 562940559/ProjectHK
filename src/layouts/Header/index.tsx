import styled from 'styled-components';
import { useModel, history, useLocation } from 'umi';
import { useState } from 'react';

import { navList } from '../navList';
import { skip } from '../tools/skip';
import { walletDisconnect } from '@/utils/wallet/useWallet';
import WalletConnect from '@/components/Modal/WalletConnect';
import Notification from '@/components/common/Notification';
import { loginOut } from '@/services/login';

import LogoHref from '@/assets/common/logo.svg';
import Wallet from '@/assets/common/wallet.svg';

type HeaderProps = {
  shouldAbsolute: boolean;
};

type NavProps = {
  isCurrentPage: boolean;
};

type ShowType = {
  isShow: boolean;
};

interface TSLangList {
  lang: string;
  langText: string;
}

interface TSHeaderProps {
  nowPath: string;
}

const HeaderWrapper = styled.div<HeaderProps>`
  min-width: 1440px;
  font-size: 16px;
  width: 100%;
  height: 78px;
  box-sizing: border-box;
  padding: 0 30px;
  background: transparent;
  ${({ shouldAbsolute }) =>
    shouldAbsolute
      ? {
          position: 'absolute',
          left: '0px',
          top: '0px',
          zIndex: '999',
        }
      : {
          position: 'relative',
        }};
`;

const HeaderCont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 28px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 3px;
`;

const LogoText = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  background: linear-gradient(to right, #dd81ff, #1238ff);
  -webkit-background-clip: text;
  color: transparent;
`;

const NavWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const OneNav = styled.div<NavProps>`
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.01em;
  cursor: pointer;
  margin-right: 28px;
  color: ${({ isCurrentPage }) => (isCurrentPage ? '#FFFFFF' : '#A9A9B7')};
  &:hover {
    color: #fff;
  }
  .line {
    margin-top: 4px;
    ${({ isCurrentPage }) =>
      isCurrentPage
        ? {
            width: '16px',
            height: '3px',
            background:
              'linear-gradient(113.25deg, #DD81FF 15.03%, #491CFF 84.97%)',
            borderRadius: '10px',
          }
        : {}};
  }
`;

const LaunchApp = styled.div`
  width: 201px;
  height: 48px;
  cursor: pointer;
  color: white;
  font-family: Poppins;
  font-size: 16px;
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WalletShow = styled.div`
  width: 193px;
  height: 48px;
  cursor: pointer;
  color: #f5f5ff;
  font-family: Poppins;
  font-size: 16px;
  background: #2c2c35;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WalletImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
const WalletAddress = styled.div`
  width: 117px;
  overflow: hidden;
  text-overflow: ellipsis;
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

export default function Header(props: TSHeaderProps) {
  const [isShow, setType] = useState(false);

  /**
   * 国际化暂时静置
   */
  // const { nowLang, langList, changeLang, t } = useModel('useLang', (model) => ({
  //   nowLang: model.nowLang,
  //   langList: model.langList,
  //   changeLang: model.changeLang,
  //   t: model.t,
  // }));
  const { checkLogin, userInfo, clearUserInfo } = useModel('useUser');
  const checkLoginRes = checkLogin();
  const { pathname } = useLocation();

  const getType = (e: boolean) => {
    setType(e);
  };

  const LogoClick = () => {
    if (props.nowPath === '/') {
      location.reload();
    } else {
      history.push('/');
    }
  };

  const loginOutFun = async () => {
    const res: any = await loginOut();
    if (res && res.code === '1') {
      clearUserInfo();
      walletDisconnect();
      Notification({
        type: 'success',
        message: 'notice',
        description: 'Successfully logged out',
      });
      history.replace('/');
    } else {
      Notification({
        type: 'error',
        message: 'error',
        description: 'Logout failed',
      });
    }
  };

  return (
    <HeaderWrapper shouldAbsolute={true}>
      <HeaderCont>
        <LogoWrap onClick={() => LogoClick()}>
          <Logo src={LogoHref} />
          <LogoText>1Kash</LogoText>
        </LogoWrap>
        <NavWrap>
          {navList.map((item, index) => {
            return (
              <OneNav
                isCurrentPage={props.nowPath === item.path}
                key={index}
                onClick={() => skip(item, checkLoginRes, pathname)}
              >
                {item.name}
                <div className="line"></div>
              </OneNav>
            );
          })}
        </NavWrap>
        {checkLogin() ? (
          <WalletShow onClick={() => loginOutFun()}>
            <WalletImg src={Wallet} />
            <WalletAddress>{userInfo.walletAddress}</WalletAddress>
          </WalletShow>
        ) : (
          <LaunchApp onClick={() => setType(true)}>
            <WalletImg src={Wallet} />
            Connect Wallet
          </LaunchApp>
        )}
      </HeaderCont>
      <Mask isShow={isShow}>
        <WalletConnect setType={getType} />
      </Mask>
      {/* {langList.map((item: TSLangList, index: number) => (
        <Button key={index} type='text' onClick={() => {
          changeLang(item.lang)
        }
        }>{item.langText}</Button>
      ))} */}
    </HeaderWrapper>
  );
}
