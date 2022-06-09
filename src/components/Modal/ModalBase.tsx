import { Children, FunctionComponent } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

const ModalWrap = styled.div`
  .ant-modal-header {
    border-bottom: none;
    border-radius: 12px;
  }
  .ant-modal-title {
    color: #1a1a1a;
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 18px;
  }
  .ant-modal-body {
    padding: 20px;
  }
  .ant-modal-content {
    border-radius: 12px;
  }
`;

const ModalBase: FunctionComponent = ({ children }): JSX.Element => {
  return <ModalWrap>{children}</ModalWrap>;
};

export default ModalBase;
