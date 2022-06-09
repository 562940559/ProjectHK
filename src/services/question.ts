import request from '@/utils/request';

// 查询问卷列表
export const commonList = () => request.get('/portal/question/common/list');

// 查询用户最近一次答卷结果
export const questionOne = () => request.get('/portal/question/one');

// 提交答题结果
export const submitResult = (data: any) =>
  request.post('/portal/question/submitResult', {
    data: data,
  });

// 通过用户最近一次问卷结果匹配产品
export const getMatchProduct = () => request.get('/portal/matchProducts');
