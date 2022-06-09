import styled from 'styled-components';
import { history } from 'umi';

import { socialList } from '@/layouts/socialList';
import Notification from '@/components/common/Notification';
import { navList } from '../navList';

import LogoHref from '@/assets/common/logo.svg';

type FooterProps = {
  shouldAbsolute: boolean;
};
interface TSFooterProps {
  nowPath: string;
}
type NavProps = {
  isCurrentPage: boolean;
};

const Wrapper = styled.div<FooterProps>`
  width: 100%;
  background: transparent;
  box-sizing: border-box;
  padding: 0 20px;
  ${({ shouldAbsolute }) =>
    shouldAbsolute
      ? {
          position: 'absolute',
          left: '0px',
          right: '0px',
          bottom: '0px',
          zIndex: '999',
        }
      : {
          width: '100%',
          position: 'relative',
        }};
`;

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 28px;
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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
  margin-bottom: 16px;
  color: #a9a9b7;
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

const ContractList = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid #40404a;
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
  const skip = (item: any) => {
    if (item.type === 'inside') {
      history.push(item.path);
    } else {
      window.open(item.path);
    }
  };

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
              onClick={() => skip(item)}
            >
              {item.name}
              <div className="line"></div>
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
      <Year>©2022</Year>
    </Wrapper>
  );
}
