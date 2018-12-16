import React from 'react';
import styled from 'styled-components';

import PageBase from '../../../common/components/PageBase';
import Title from '../../../common/components/Title';

const Contents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const TitleWrapper = styled.div`max-width: 60%;`;

const NotFound = props =>
  <PageBase className={props.className}>
    <Contents>
      <TitleWrapper>
        <Title>404 - Not Found</Title>
      </TitleWrapper>
    </Contents>
  </PageBase>;

export default NotFound;
