import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';

type PropsType = {
  size?: number | string;
  block?: boolean;
  weight?: number | string;
} & React.HTMLAttributes<HTMLSpanElement>;

const Wrapper = styled.span<PropsType>`
  display: inline-block;
  font-weight: ${(props) => (props.weight ? `${props.weight}` : 400)};
  width: ${(props) => (props.block ? `100%` : ``)};
  font-size: ${(props) =>
    props.size !== undefined ? `${props.size}px` : '14px'};
`;

/**
 * Text组件
 * @description 按照规范输出不同尺寸文字
 * @param children
 * @param {string} size 1~9
 * @param props
 */
const Text: FC<PropsType> = ({ children, size, ...props }): ReactElement => {
  return (
    <Wrapper size={size} {...props}>
      {children}
    </Wrapper>
  );
};

export default Text;
