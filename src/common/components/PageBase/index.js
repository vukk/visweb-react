// import React from 'react';
import styled, { css } from 'styled-components';

const Base = styled.div`
  ${props => css`background-color: ${props.theme.background}`};

  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;

  ${props => props.centerText && css`text-align: center;`};
`;

Base.defaultProps = {
  theme: {
    background: '#ccc',
  },
};

export default Base;
