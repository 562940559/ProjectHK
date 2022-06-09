import styled from 'styled-components';
import { useModel } from 'umi';
import { Radio, Steps } from 'antd';
import { useDispatch } from 'dva';
import { useState, useEffect } from 'react';

import Notification from '@/components/common/Notification';
import { setItem } from '@/utils/storage';
import { ThemeContext } from '@/pages/questionnaire/index';

import Risk from '@/assets/question/risk.svg';

const { Step } = Steps;
let allChoice: any[] = [];
let twoChoice: any[] = [];

type MobileJudge = {
  isMobile: boolean;
};

type Value = {
  value: number;
};

const TitleModal = styled.div`
  display: flex;
  font-family: 'Poppins';
`;
const RiskImg = styled.img`
  width: 88px;
  height: 88px;
  margin-right: 16px;
`;
const Title = styled.div<MobileJudge>`
  font-weight: 500;
  font-size: ${({ isMobile }) => (isMobile ? '28px' : '40px')};
  line-height: ${({ isMobile }) => (isMobile ? '36px' : '48px')};
  color: #ffffff;
  margin-bottom: 4px;
`;
const Des = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #a9a9b7;
`;
const Answer = styled.div`
  margin-top: 40px;
  border-radius: 20px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  padding: 1px;
`;
const Inside = styled.div<MobileJudge>`
  background: #1e1e24;
  backdrop-filter: blur(40px);
  border-radius: 20px;
  padding: ${({ isMobile }) => (isMobile ? '20px' : '40px')};
  .Progress {
    width: 575px;
    margin: 0 auto;
    margin-bottom: 40px;
  }
  .ant-steps-item-process
    .ant-steps-item-icon
    > .ant-steps-icon:first-child
    .ant-steps-icon-dot {
    background: #491cff;
  }
  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: #dd81ff;
  }
  .ant-steps-item-process
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background-color: #4b4b50;
  }
  .ant-steps-item-wait
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot {
    background: rgba(255, 255, 255, 0.2);
  }
  .ant-steps-item-wait
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: #70707c;
  }
  .ant-steps-item-finish
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot {
    background: #dd81ff;
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title {
    color: #dd81ff;
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-tail::after {
    background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  }
  .ant-steps-item-title {
    font-size: 20px;
  }
`;
const Mb40 = styled.div`
  margin-bottom: 40px;
  .ant-radio-inner::after {
    background-color: #9d3aff;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: #9d3aff;
  }
  .ant-radio-inner {
    background-color: transparent;
  }
  .ant-radio-input:focus + .ant-radio-inner {
    box-shadow: none;
  }
  .ant-radio-wrapper-checked > span.ant-radio + * {
    color: #f4eeff;
    font-weight: 500;
  }
`;
const Problem = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: #f5f5ff;
  margin-bottom: 20px;
`;
const SubmitBtn = styled.div<Value>`
  width: 240px;
  height: 48px;
  background: linear-gradient(113.25deg, #dd81ff 15.03%, #491cff 84.97%);
  border-radius: 12px;
  font-size: 16px;
  line-height: 48px;
  text-align: center;
  color: #f5f5ff;
  cursor: pointer;
  margin: ${(props) => (props.value === 0 ? '0 auto' : '')};
`;

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Previous = styled.div<MobileJudge>`
  width: 240px;
  height: 48px;
  background: linear-gradient(
    113.25deg,
    rgba(221, 129, 255, 0.3) 15.03%,
    rgba(73, 28, 255, 0.3) 84.97%
  );
  border-radius: 12px;
  font-size: 16px;
  line-height: 48px;
  text-align: center;
  color: #f5f5ff;
  cursor: pointer;
  ${(props) =>
    props.isMobile
      ? {
          marginBottom: '20px',
        }
      : {
          marginRight: '40px',
        }}
`;

export default function Answers() {
  const [AnswerList, setList] = useState<any[]>([]);
  const [nowStep, setStep] = useState(0);
  const dispatch = useDispatch();
  const [oneList, setOneList] = useState<any[]>([]);
  const [twoList, setTwoList] = useState<any[]>([]);

  const { isMobile } = useModel('useWindowSize');
  const { checkLogin } = useModel('useUser');

  // 初始化radio样式
  const radioStyle = {
    display: 'block',
    lineHeight: '24px',
    marginBottom: '12px',
    color: '#A9A9B7',
  };

  useEffect(() => {
    getData();
    return () => {
      allChoice = [];
      twoChoice = [];
    };
  }, []);

  // 获取答题列表
  const getData = async () => {
    try {
      const res: any = await dispatch({ type: 'question/commonList' });
      if (!res) {
        return;
      }
      setList(res);
    } catch (err) {}
  };

  // 点击提交按钮
  const submit = async (toggleTheme: any) => {
    if (!checkLogin()) {
      Notification({
        type: 'error',
        message: 'error',
        description: 'Please Login',
      });
      return false;
    }
    if (allChoice.length === 10) {
      try {
        const res: any = await dispatch({
          type: 'question/submitResult',
          payload: allChoice,
        });
        if (!res) {
          return;
        }
        if (res.code === '1') {
          setItem('isAnswer', true);
          toggleTheme(false);
        }
      } catch (err: any) {
        throw new Error(err.message);
      }
    } else {
      Notification({
        type: 'error',
        message: 'Please complete the questionnaire',
      });
    }
  };

  // 步骤一单选框发生改变
  const changeIt = (e: any, index: number) => {
    allChoice[index] = e.target.value;
    setOneList([...allChoice]);
  };

  // 步骤二单选框发生改变
  const twoChangeIt = (e: any, sort: number, index: number) => {
    allChoice[sort - 1] = e.target.value;
    twoChoice[index] = e.target.value;
    setTwoList([...twoChoice]);
  };

  const OneStep = AnswerList.slice(0, 6).map((item, index) => {
    return (
      <Mb40 key={index}>
        <Problem>
          {item.sort}. {item.content}
        </Problem>
        <Radio.Group
          onChange={(e) => changeIt(e, index)}
          value={oneList[index]}
        >
          {item.items.map((it: any, index: number) => {
            return (
              <Radio style={radioStyle} value={it.id} key={index}>
                {it.content}
              </Radio>
            );
          })}
        </Radio.Group>
      </Mb40>
    );
  });

  const TwoStep = AnswerList.slice(6, 10).map((item, index) => {
    return (
      <Mb40 key={index}>
        <Problem>
          {item.sort}. {item.content}
        </Problem>
        <Radio.Group
          onChange={(e) => twoChangeIt(e, item.sort, index)}
          value={twoList[index]}
        >
          {item.items.map((it: any, index: number) => {
            return (
              <Radio style={radioStyle} value={it.id} key={index}>
                {it.content}
              </Radio>
            );
          })}
        </Radio.Group>
      </Mb40>
    );
  });

  return (
    <div>
      <TitleModal>
        <RiskImg src={Risk} />
        <div>
          <Title isMobile={isMobile}>Risk Questionnaire</Title>
          <Des>
            Explore Your Risk Preferences And Investment Profile,Capture The
            Right Assets For You More Accurately.
          </Des>
        </div>
      </TitleModal>
      <Answer>
        <Inside isMobile={isMobile}>
          <Steps progressDot current={nowStep} className="Progress">
            <Step title="Risk Profiling" />
            <Step title="Market Volatity" />
          </Steps>
          {nowStep === 0 ? OneStep : TwoStep}
          {nowStep === 0 ? (
            <SubmitBtn value={nowStep} onClick={() => setStep(1)}>
              Next step
            </SubmitBtn>
          ) : (
            <FlexWrap>
              <Previous isMobile={isMobile} onClick={() => setStep(0)}>
                Previous
              </Previous>
              <ThemeContext.Consumer>
                {({ toggleTheme }) => (
                  <SubmitBtn
                    value={nowStep}
                    onClick={() => submit(toggleTheme)}
                  >
                    Submit
                  </SubmitBtn>
                )}
              </ThemeContext.Consumer>
            </FlexWrap>
          )}
        </Inside>
      </Answer>
    </div>
  );
}
