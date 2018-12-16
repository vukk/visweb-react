import React from 'react';
import styled, { css } from 'styled-components';

import PageBase from '../../../common/components/PageBase';
import WrapTop from '../../../common/components/WrapTop';
import Logo from '../../../common/components/Logo';

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${props =>
    !props.noMargin &&
    css`margin-left: 0.8em;
  margin-right: 0.8em;`};
`;

const TitleWrapper = styled.div`
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: auto;
  max-width: 85%;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 10%;
  margin-left: auto;
  margin-right: auto;
`;

const Page = props =>
  <PageBase className={props.className}>
    <WrapTop content={<Logo primary size="20" />}>
      {props.title &&
        <TitleWrapper>
          {props.title}
        </TitleWrapper>}
      <Content {...props}>
        {props.children}
      </Content>
      {props.bottomButton &&
        <ButtonWrapper>
          {props.bottomButton}
        </ButtonWrapper>}
    </WrapTop>
  </PageBase>;

export default Page;
