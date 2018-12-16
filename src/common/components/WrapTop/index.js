import React from 'react';
import styled, { css } from 'styled-components';

const Base = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  max-width: 100%;

  ${props =>
    props.fullWidth &&
    css`
    width: 100%;
  `};
`;

const Top = styled.div`
  ${props =>
    props.center &&
    css`
    justify-content: center;
  `};
`;

const Bottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const WrapTop = props =>
  <Base fullWidth={props.fullWidth} className={props.className}>
    <Top center={props.center}>
      {props.content}
    </Top>
    <Bottom>
      {props.children}
    </Bottom>
  </Base>;

WrapTop.defaultProps = {
  center: false,
  fullWidth: false,
  content: <div>Top</div>,
};

export default WrapTop;
