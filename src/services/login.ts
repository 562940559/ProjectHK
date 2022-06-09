import request from '@/utils/request';

// 登录
interface loginPara {
  message: string;
  signature: string;
  walletAddress: string;
  walletType: number;
}
export const login = (params: loginPara) =>
  request.post('/portal/user/common/login', {
    data: params,
  });

// 获取个人用户信息
export const getUserInfo = () => request.get('/portal/user/getUserInfo');

// 退出
export const loginOut = () => request.get('/portal/user/loginOut');
