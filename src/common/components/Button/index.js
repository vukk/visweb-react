import React from 'react';
import styled from 'styled-components';

/**
  * You can give icons as components, for example use react-icons:
  * import { IoAndroidCheckbox } from 'react-icons/io';
  * <Button Icon={IoAndroidCheckbox}>
  */

const Base = styled.button`
  outline: none;

  /* non-gradient */
  background: ${props =>
    props.primary ? props.theme.btnPrimary : props.theme.btnSecondary};
  /* gradient, primary */
  ${props =>
    props.gradient &&
    props.primary &&
    `background: linear-gradient(90deg, ${props.theme.btnPrimary}, ${props.theme
      .btnPrimaryGradient});`};
  /* gradient, secondary */
  ${props =>
    props.gradient &&
    !props.primary &&
    `background: linear-gradient(90deg, ${props.theme.btnSecondary}, ${props
      .theme.btnSecondaryGradient});`};

  color: ${props =>
    props.primary ? props.theme.btnPrimaryText : props.theme.btnSecondaryText};

  font-weight: 200;
  border: 0;
  ${props =>
    !props.primary &&
    !props.gradient &&
    `border: 1px solid ${props.theme.btnPrimary};`};

  font-size: calc(0.8em * ${props => (props.size ? props.size : 10) / 8});
  padding: calc(0.38em * ${props => (props.size ? props.size : 10) / 8})
    calc(1.00em * ${props => (props.size ? props.size : 10) / 8});

  min-width: calc(0.865em * ${props => (props.size ? props.size : 10)});
  border-radius: 5000px; /* hack? */

  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconDiv = styled.div`
  width: 20%;
  padding: 0;
  margin: 0;
  margin-right: 0.4em;

  display: flex;

  font-size: 1.2em;
`;

const Content = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  white-space: nowrap;
`;

const Button = props => {
  const { Icon, children, className, ...passProps } = props;
  return (
    <Base {...passProps} className={className}>
      {Icon
        ? <IconDiv>
            <Icon />
          </IconDiv>
        : null}
      <Content>
        {children}
      </Content>
    </Base>
  );
};

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

// Default theme
Base.defaultProps = {
  theme: {
    btnPrimary: 'black',
    btnPrimaryGradient: 'grey',
    btnPrimaryText: 'white',
    btnSecondary: 'white',
    btnSecondaryGradient: 'lightgrey',
    btnSecondaryText: 'black',
  },
};

export default Button;
