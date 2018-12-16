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
      <Field name="network_mode" component="input" type="radio" value="2d" />
      &nbsp;2D
    </Item>
    <Item>
      <Field name="network_mode" component="input" type="radio" value="3d" />
      &nbsp;3D
    </Item>
  </>;

export default Options;
