import { history } from 'umi';

import Notification from '@/components/common/Notification';

/**
 * header footer 导航跳转
 * @param item
 * @returns
 */
export function skip(item: any, checkLogin: boolean, pathname: string) {
  if (item.shouldLogin && !checkLogin) {
    Notification({
      type: 'error',
      message: 'error',
      description: 'Please Login',
    });
    return false;
  }
  if (pathname === item.path) {
    location.reload();
    return true;
  }
  if (item.type === 'inside') {
    history.push(item.path);
    return true;
  }
  window.open(item.path);
  return true;
}
