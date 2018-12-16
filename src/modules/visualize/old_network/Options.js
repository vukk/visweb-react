import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

const Item = styled.div`
  flex: 1;
  /* display: flex;
  flex-flow: column; */
`;

const Options = props =>
  <>
    <Item>
      <Field name="old_network_directed" component="input" type="checkbox" value={true} />
      &nbsp;Directed network?
    </Item>
  </>;

export default Options;
