import React from 'react';
import styled, { css } from 'styled-components';

const Base = styled.p`
  ${props =>
    !props.large &&
    !props.small &&
    !props.extralarge &&
    !props.tiny &&
    css`font-size: 16px;`};
  ${props => props.large && css`font-size: 20px;`};
  ${props => props.extralarge && css`font-size: 24px;`};
  ${props => props.small && css`font-size: 14px;`};
  ${props => props.tiny && css`font-size: 12px;`};
  ${props => props.thin && css`font-weight: 200;`};
  ${props => props.bold && css`font-weight: bold;`};
  color: ${props => props.theme.text};
  ${props =>
    props.withShadow && css`text-shadow: 1px 1px ${props.theme.textShadow};`};
`;

const Paragraph = props =>
  <Base {...props} className={props.className}>
    {props.children}
  </Base>;

Base.defaultProps = {
  theme: {
    text: 'black',
    textShadow: 'white',
  },
};

const SpanBase = Base.withComponent('span');
const SpanBlock = styled(SpanBase)`display: inline-block;`;
export const Span = props =>
  props.noBlock
    ? <SpanBase {...props} className={props.className}>
        {props.children}
      </SpanBase>
    : <SpanBlock {...props} className={props.className}>
        {props.children}
      </SpanBlock>;

export default Paragraph;
