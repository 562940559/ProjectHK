import styled from 'styled-components';
import { useModel, history, useLocation } from 'umi';

import Notification from '@/components/common/Notification';
import { socialList } from '@/layouts/socialList';
import { navList } from '../navList';
import { skip } from '../tools/skip';

import LogoHref from '@/assets/common/logo.svg';

type FooterProps = {
  shouldAbsolute: boolean;
};
interface TSFooterProps {
  nowPath: string;
}

const Wrapper = styled.div<FooterProps>`
  min-width: 1440px;
  background: transparent;
  ${({ shouldAbsolute }) =>
    shouldAbsolute
      ? {
          position: 'absolute',
          left: '0px',
          right: '0px',
          bottom: '0px',
          zIndex: '990',
        }
      : {
          width: '100%',
          position: 'relative',
        }};
`;

const Cont = styled.div`
  width: 1280px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  border-bottom: 1px solid #40404a;
`;

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 60px;
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

const OneNav = styled.div`
  font-family: PingFang SC;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.01em;
  cursor: pointer;
  margin-right: 28px;
  color: #a9a9b7;
  &:hover {
    color: #fff;
  }
`;

const ContractList = styled.div`
  display: flex;
  > div:last-child {
    margin-right: 0px;
  }
`;

const OneConteactWrap = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  box-sizing: border-box;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
`;
const Year = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #70707c;
  padding: 20px 0;
  text-align: center;
`;

const ContractImg = styled.img``;

export default function Footer(props: TSFooterProps) {
  const { checkLogin, userInfo, clearUserInfo } = useModel('useUser');
  const checkLoginRes = checkLogin();
  const { pathname } = useLocation();

  const toSocial = (e: any) => {
    if (e) {
      window.open(e, '_black');
    } else {
      Notification({
        type: 'info',
        message:
          'Will open discord and medium later. Don’t need to connect now',
      });
    }
  };

  const LogoClick = () => {
    if (props.nowPath === '/') {
      location.reload();
    } else {
      history.push('/');
    }
  };

  return (
    // props.nowPath === '/'
    <Wrapper shouldAbsolute={true}>
      <Cont>
        <LogoWrap onClick={() => LogoClick()}>
          <Logo src={LogoHref} />
          <LogoText>1Kash</LogoText>
        </LogoWrap>
        <NavWrap>
          {navList.map((item, index) => {
            return (
              <OneNav
                key={index}
                onClick={() => skip(item, checkLoginRes, pathname)}
              >
                {item.name}
              </OneNav>
            );
          })}
        </NavWrap>
        <ContractList>
          {socialList.map((item, index) => {
            return (
              <OneConteactWrap
                onClick={() => {
                  toSocial(item.href);
                }}
                key={index}
              >
                <ContractImg src={item.icon} />
              </OneConteactWrap>
            );
          })}
        </ContractList>
      </Cont>
      <Year>©2022</Year>
    </Wrapper>
  );
}
