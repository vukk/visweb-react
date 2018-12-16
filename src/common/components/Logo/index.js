import React from 'react';
import styled from 'styled-components';

const Base = styled.div`
  font-weight: 200;

  font-size: calc(0.8em * ${props => (props.size ? props.size : 10) / 8});
  // padding: calc(0.38em * ${props => (props.size ? props.size : 10) / 8})
  //   calc(1.00em * ${props => (props.size ? props.size : 10) / 8});
  // padding-left: 0.5em;
  // padding-right: 0.5em;

  padding-left: calc(0.3em * ${props => (props.size ? props.size : 10) / 8});
  padding-right: calc(0.3em * ${props => (props.size ? props.size : 10) / 8});

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  color: ${props =>
    props.primary ? props.theme.logoPrimaryText
                  : props.theme.logoSecondaryText};
  position: relative;

  white-space: nowrap;
`;

const SmallText = styled.div`
  color: ${props =>
    props.primary ? props.theme.logoPrimarySmallText
                  : props.theme.logoSecondarySmallText};

  font-size: calc(0.3em * ${props => (props.size ? props.size : 10) / 8});

  position: absolute;
  bottom: -0.8em;
  right: -0.8em;
  // font-size: 8pt;
`;

//<Flex /><Content>Visingo</Content><Flex />
const Logo = props => {
  const { className, ...passProps } = props;
  return (
    <Base {...passProps} className={className}>
      <Content {...passProps}>
        Visingo<SmallText {...passProps}>Web</SmallText>
      </Content>
    </Base>
  );
};

Base.defaultProps = {
  theme: { // Default theme
    logoPrimaryText: 'white',
    logoSecondaryText: 'black',
    logoPrimarySmallText: 'grey',
    logoSecondarySmallText: 'grey',
  },
};

export default Logo;
