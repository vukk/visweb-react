import React from 'react';
import styled, { keyframes, css } from 'styled-components';

function getShadow(props) {
  if (props.strength === "1") {
    if (props.depth === "1") return '0px 2px 4px rgba(0,0,0,0.1)';
    if (props.depth === "2") return '0px 4px 16px rgba(0,0,0,0.2)';
    if (props.depth === "3") return '0px 6px 22px rgba(0,0,0,0.3)';
    return '0px 2px 4px rgba(0,0,0,0.1)';
  }
  if (props.strength === "2") {
    if (props.depth === "1") return '0px 2px 4px rgba(0,0,0,0.4)';
    if (props.depth === "2") return '0px 4px 16px rgba(0,0,0,0.5)';
    if (props.depth === "3") return '0px 6px 22px rgba(0,0,0,0.6)';
    return '0px 2px 4px rgba(0,0,0,0.3)';
  }
  if (props.strength === "3") {
    if (props.depth === "1") return '0px 2px 4px rgba(0,0,0,0.7)';
    if (props.depth === "2") return '0px 4px 16px rgba(0,0,0,0.8)';
    if (props.depth === "3") return '0px 6px 22px rgba(0,0,0,0.9)';
    return '0px 2px 4px rgba(0,0,0,0.7)';
  }
  return '0px 2px 4px rgba(0,0,0,0.1)';
}

function getCardAnimation(props) {
  let dir = 'translateY';
  let sign = -1;

  if (props.animDir === 'left' || props.animDir === 'right') dir = 'translateX';
  if (props.animDir === 'top' || props.animDir === 'bottom') dir = 'translateY';
  if (props.animDir === 'bottom' || props.animDir === 'right') sign = 1;

  return keyframes`
    from { opacity: 0; transform: ${dir}(${sign * 22}px); }
    to { opacity: 1; transform: ${dir}(0px); }
  `;
}

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.background ? props.background : '#fff')};
  ${props => props.color && css`color: ${props.color};`};
  border-radius: 4px;
  width: 100%;
  box-shadow: ${props => getShadow(props)};

  @media print {
    box-shadow: none;
    padding: 16px;
  }
`;

const Inner = styled.div`
  padding: 32px;
`;

const Card = props => <Outer {...props}><Inner>{props.children}</Inner></Outer>;

export const CardAnimated = styled(Card)`
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.4s ease-in;
  animation: ${props => getCardAnimation(props)} 1s forwards;
  animation-delay: 0.2s;
`;

export default Card;
