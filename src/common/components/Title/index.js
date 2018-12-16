import React from 'react';
import styled, { css } from 'styled-components';

// Base
// TODO: This should work by changing h1-h3.
const Base = styled.h1`
  ${props => !props.large && !props.small && css`font-size: 22px;`};
  ${props => props.large && css`font-size: 32px;`};
  ${props => props.small && css`font-size: 18px;`};
  font-weight: bold;
  ${props => props.thin && css`font-weight: 400;`};
  ${props => props.thinner && css`font-weight: 300;`};
  ${props => props.thinnest && css`font-weight: 200;`};
  color: ${props => props.theme.textTitle};
  ${props =>
    props.withShadow &&
    css`text-shadow: 1px 1px ${props.theme.textTitleShadow};`};
`;

const Title = props =>
  <Base {...props} className={props.className}>
    {props.children}
  </Base>;

Base.defaultProps = {
  theme: {
    textTitle: 'black',
    textTitleShadow: 'white',
  },
};

const OnlyTextBase = Base.withComponent('span');
export const TitleText = props =>
  <OnlyTextBase {...props} className={props.className}>
    {props.children}
  </OnlyTextBase>;

export default Title;
