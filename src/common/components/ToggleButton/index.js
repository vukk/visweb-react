import React from 'react';
import styled from 'styled-components';

const Base = styled.div``;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: ${props => (!props.size ? `60` : props.size * 60)}px;
  height: ${props => (!props.size ? `34` : props.size * 34)}px;
  input {
    display: none;
  }
`;

const Input = styled.input`
  &:checked + span {
    background-color: ${props =>
      props.primary ? props.theme.primaryBgOn : props.theme.secondaryBgOn};
    border-color: ${props =>
      !props.primary ? props.theme.secondaryBorder : null};
  }
  &:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }
  &:checked + span:before {
    -webkit-transform: translateX(
      ${props => (!props.size ? '26' : props.size * 26)}px
    );
    background-color: ${props =>
      !props.primary ? props.theme.secondaryBallOn : null};
    -ms-transform: translateX(
      ${props => (!props.size ? '26' : props.size * 26)}px
    );
    transform: translateX(${props => (!props.size ? '26' : props.size * 26)}px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props =>
    props.primary ? props.theme.primaryBgOff : props.theme.secondaryBgOff};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: ${props => (!props.size ? `34` : props.size * 34)}px;
  border-width: 1px;
  border-style: solid;
  border-color: ${props =>
    props.primary ? props.theme.primaryBorder : `#ccc`};
  margin: -1px;
  &:before {
    position: absolute;
    content: '';
    width: ${props => (!props.size ? `26` : props.size * 26)}px;
    height: ${props => (!props.size ? `26` : props.size * 26)}px;
    left: ${props => (!props.size ? `4` : props.size * 4)}px;
    bottom: ${props => (!props.size ? `4` : props.size * 4)}px;
    border-radius: 50%;
    background-color: ${props =>
      props.primary
        ? props.theme.primaryBallOff
        : props.theme.secondaryBallOff};
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

const ToggleButton = props => {
  const { onClick, checked, ...passProps } = props;
  return (
    <Base {...passProps} className={props.className}>
      <Switch {...passProps}>
        <Input
          {...passProps}
          type="checkbox"
          onChange={onClick}
          checked={checked}
        />
        <Slider {...passProps} />
      </Switch>
    </Base>
  );
};

// Default theme
Slider.defaultProps = {
  theme: {
    primaryBgOff: '#fff',
    primaryBallOff: '#000',
    primaryBorder: '#ccc',
    secondaryBgOff: '#fff',
    secondaryBallOff: '#666',
    secondaryBorder: '#ccc',
  },
};

Input.defaultProps = {
  theme: {
    primaryBgOn: '#ccc',
    secondaryBgOn: '#ccc',
    primaryBallOn: '#000',
    secondaryBallOn: '#666',
  },
};

export default ToggleButton;
