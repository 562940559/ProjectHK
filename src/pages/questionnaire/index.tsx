import React, { useState, useEffect } from 'react';
import { useModel } from 'umi';

import QuestionPage from '@/components/QuestionPage/index';
import QuestionResult from '@/components/QuestionResult/index';

import { getItem } from '@/utils/storage';

let questionStatus: any;

export default function IndexPage() {
  const [isAnswer, setStatus] = useState(true);

  const { checkLogin } = useModel('useUser');

  useEffect(() => {
    // 判断是否登录以及是否答题
    if (checkLogin() && getItem('isAnswer')) {
      setStatus(false);
    }
  }, []);

  questionStatus = (e: boolean) => {
    setStatus(e);
  };

  return isAnswer ? <QuestionPage /> : <QuestionResult />;
}

export const ThemeContext = React.createContext({
  toggleTheme: (e: boolean) => {
    questionStatus(e);
  },
});
