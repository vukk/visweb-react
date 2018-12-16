import styled, { css } from 'styled-components';

const WidthRestrict = styled.div`
  max-width: 960px;
  flex: 1;
  ${props => props.column && css`flex-direction: column`};
  ${props =>
    !props.column &&
    props.direction &&
    css`flex-direction: ${props.direction}`};
  width: 100%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

export default WidthRestrict;
