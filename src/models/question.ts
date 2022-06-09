import { Effect } from 'umi';
import { commonList, questionOne, submitResult } from '@/services/question';

const namespace = 'question';
export const namespace_shop = namespace;

interface ModelState {
  name: string;
}

interface ModelsType {
  namespace: typeof namespace;
  state: ModelState;
  effects: {
    commonList: Effect;
    questionOne: Effect;
    submitResult: Effect;
  };
  // subscriptions: { setup: Subscription };
}

const QuestionModels: ModelsType = {
  namespace,
  state: {
    name: 'question',
  },
  effects: {
    *commonList({ payload }, { call, put }) {
      const res = yield call(commonList, payload);
      return res.data;
    },
    *questionOne({ payload }, { call, put }) {
      const res = yield call(questionOne, payload);
      return res.data;
    },
    *submitResult({ payload }, { call, put }) {
      const res = yield call(submitResult, payload);
      return res;
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname }) => {
  //       if (pathname === '/shop') {
  //         dispatch({
  //           type: 'query',
  //         })
  //       }
  //     });
  //   }
  // }
};

export default QuestionModels;
