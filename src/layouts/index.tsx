import { IRouteComponentProps } from 'umi';
import { useModel } from 'umi';

import { GlobalStyle } from '@/styles/global';
import Header from './Header/index';
import MobileHeader from './Header/MobileHeader';
import MobileFooter from './Footer/MobileFooter';
import Footer from './Footer/index';

export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  if (location.pathname === '/login') {
    return children;
  }

  const { isMobile } = useModel('useWindowSize');

  return (
    <>
      <GlobalStyle />
      {isMobile ? (
        <MobileHeader nowPath={location.pathname} />
      ) : (
        <Header nowPath={location.pathname} />
      )}
      {children}
      {isMobile ? (
        <MobileFooter nowPath={location.pathname} />
      ) : (
        <Footer nowPath={location.pathname} />
      )}
    </>
  );
}
