import styled from 'styled-components';
import { useModel, history } from 'umi';
import { navList } from '../navList';

import LogoHref from '@/assets/common/logo.svg';
import MenuHref from '@/assets/header/mobileMenu.png';
import CloseHref from '@/assets/header/close.png';

type HeaderProps = {
  shouldAbsolute: boolean;
};

interface TSHeaderProps {
  nowPath: string;
}

type NavProps = {
  isCurrentPage: boolean;
};

const HeaderWrap = styled.div<HeaderProps>`
  width: 100%;
  height: 68px;
  background: transparent;
  box-sizing: border-box;
  padding: 0 20px;
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
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 0;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 20px;
  width: 40px;
  height: 40px;
`;

const Close = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const CloseIcon = styled.img``;

const MenuIcon = styled.img``;

const NavMenu = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 998;
  background: #111113;
  box-sizing: border-box;
  padding-top: 68px;
  padding-left: 20px;
  padding-right: 20px;
`;

const OneNav = styled.div<NavProps>`
  margin-bottom: 36px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ isCurrentPage }) => (isCurrentPage ? '#fff' : '#A9A9B7')};
`;

/**
 *
 * @param nowPath 当前路由
 * @returns
 */
export default function MobileHeader({ nowPath }: TSHeaderProps) {
  const { navMenuSwitch, changeNavMenuSwitch } = useModel('useGlobalSwitch');

  const skip = (item: any) => {
    if (item.type === 'inside') {
      history.push(item.path);
    } else {
      window.open(item.path);
    }
    changeNavMenuSwitch(!navMenuSwitch);
  };

  const LogoClick = () => {
    if (nowPath === '/') {
      location.reload();
    } else {
      history.push('/');
    }
  };

  return (
    <HeaderWrap shouldAbsolute={true}>
      <HeaderCont>
        <LogoWrap onClick={() => LogoClick()}>
          <Logo src={LogoHref} />
          <LogoText>1Kash</LogoText>
        </LogoWrap>
        {navMenuSwitch ? (
          <Close>
            <CloseIcon
              src={CloseHref}
              onClick={() => changeNavMenuSwitch(!navMenuSwitch)}
            />
          </Close>
        ) : (
          <Menu>
            <MenuIcon
              src={MenuHref}
              onClick={() => changeNavMenuSwitch(!navMenuSwitch)}
            />
          </Menu>
        )}
      </HeaderCont>
      {navMenuSwitch ? (
        <NavMenu>
          {navList.map((item, index) => {
            return (
              <OneNav
                isCurrentPage={nowPath === item.path}
                key={index}
                onClick={() => skip(item)}
              >
                {item.name}
              </OneNav>
            );
          })}
        </NavMenu>
      ) : null}
    </HeaderWrap>
  );
}
