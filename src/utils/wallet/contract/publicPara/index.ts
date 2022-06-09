import dev from './dev';
import test from './test';
import prod from './prod';

const publicPara: any = {
  dev: dev,
  test: test,
  prod: prod,
};

const nowEnv: string = process.env.ENV || 'dev';

export default publicPara[nowEnv];
