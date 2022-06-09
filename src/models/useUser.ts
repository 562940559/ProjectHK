import { useState, useCallback } from 'react';
import { getItem, removeItem, setItem } from '@/utils/storage';

/**
 * 操作用户信息相关
 * @returns userInfo 用户信息
 * @returns clearUserInfo 清除登陆态
 * @returns updateUserInfo 更新用户信息
 * @returns updateToken 更新token
 * @returns checkLogin 检查当前是否登陆
 */
export default function useUserModel() {
  const [userInfo, setUserInfo] = useState(getItem('userInfo') || {});

  const clearUserInfo = () => {
    setUserInfo({});
    removeItem('userInfo');
    removeItem('token');
  };

  const updateUserInfo = (newUserInfo: any) => {
    setUserInfo({ ...userInfo, ...newUserInfo });
    setItem('userInfo', { ...userInfo, ...newUserInfo });
  };

  const updateToken = (token: string) => {
    setItem('token', token);
  };

  const checkLogin = () => {
    if (!getItem('token') || !getItem('userInfo')) return false;
    return true;
  };

  return {
    userInfo,
    clearUserInfo,
    updateUserInfo,
    updateToken,
    checkLogin,
  };
}
