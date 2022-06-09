import styled from 'styled-components';
import { useModel } from 'umi';
import { useDispatch } from 'dva';
import { useEffect, useState } from 'react';

import { ThemeContext } from '@/pages/questionnaire/index';

type MobileJudge = {
  isMobile: boolean;
};

const Box = styled.div`
  font-family: 'Poppins';
`;
const Title = styled.div<MobileJudge>`
  font-weight: 500;
  font-size: ${({ isMobile }) => (isMobile ? '28px' : '40px')};
  line-height: ${({ isMobile }) => (isMobile ? '36px' : '48px')};
  color: #f5f5ff;
  margin-bottom: 20px;
`;
const Jamb = styled.div`
  border-radius: 20px;
  padding: 1px;
  background-image: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
`;
const ScoreBox = styled.div<MobileJudge>`
  background-image: linear-gradient(113.25deg, #3f2857 15.03%, #1c1341 84.97%);
  backdrop-filter: blur(40px);
  border-radius: 20px;
  padding: 20px;
  margin: 1px;
  ${({ isMobile }) =>
    isMobile
      ? {
          display: 'block',
        }
      : {
          display: 'flex',
          alignItems: 'center',
        }}
`;
const RiskType = styled.div<MobileJudge>`
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  backdrop-filter: blur(74px);
  padding: 20px;
  border-radius: 20px;
  ${({ isMobile }) =>
    isMobile
      ? {
          marginBottom: '24px',
        }
      : {
          marginRight: '24px',
        }}
`;
const ErType = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
`;
const TypeName = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #f5f5ff;
  margin-bottom: 16px;
`;
const Score = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  backdrop-filter: blur(40px);
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  color: #f5f5ff;
  text-align: center;
`;
const Right = styled.div<MobileJudge>`
  text-align: ${({ isMobile }) => (isMobile ? '' : 'right')};
  flex: 1;
`;
const Des = styled.div`
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
  margin-bottom: 12px;
  text-align: left;
`;
const Again = styled.div`
  cursor: pointer;
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-size: 14px;
  line-height: 22px;
`;

export default function RiskScore() {
  const [OneResult, setList] = useState({ result: '', score: '', remark: '' });
  const { isMobile } = useModel('useWindowSize');
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  // 查询用户最近一次答卷结果
  const getData = async () => {
    try {
      const res: any = await dispatch({ type: 'question/questionOne' });
      if (!res) {
        return;
      }
      setList(res);
    } catch (err) {}
  };

  // 点击再答一次按钮
  const again = async (toggleTheme: any) => {
    toggleTheme(true);
  };

  return (
    <Box>
      <Title isMobile={isMobile}>Risk Questionnaire Result</Title>
      <Jamb>
        <ScoreBox isMobile={isMobile}>
          <RiskType isMobile={isMobile}>
            <ErType>your risk score:</ErType>
            <TypeName>{OneResult.result}</TypeName>
            <Score>{OneResult.score} Points</Score>
          </RiskType>
          <Right isMobile={isMobile}>
            <Des>{OneResult.remark}</Des>
            <ThemeContext.Consumer>
              {({ toggleTheme }) => (
                <Again onClick={() => again(toggleTheme)}>Redo&gt;&gt;</Again>
              )}
            </ThemeContext.Consumer>
          </Right>
        </ScoreBox>
      </Jamb>
    </Box>
  );
}
