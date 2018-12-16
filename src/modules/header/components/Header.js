import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'redux-first-router-link';

import Button from '../../../common/components/Button';
import WidthRestrict from '../../../common/components/WidthRestrict';

const Base = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;

  justify-content: center;

  color: ${props => props.theme.headerText};
  background-color: ${props => props.theme.headerBackground};

  ${props =>
    props.theme.headerBottomLine !== 'none' &&
    css`border-bottom: 2px solid ${props.theme.headerBottomLine};`};
`;

const Side = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  flex-basis: 50%;
`;

const Left = Side.extend`text-align: left;`;

const Center = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  flex-basis: 100%;

  font-size: 20px;
`;

const MenuBtn = styled(Button)`margin-left: 0.5em;`;

const Header = props =>
  <Base className={props.className}>
    <WidthRestrict>
      <Left onClick={props.openMenu}>
        <MenuBtn size="2.5em" />
      </Left>
      {props.titleLink &&
        <Link to={props.titleLink}>
          <Center>
            {props.title}
          </Center>
        </Link>}
      {!props.titleLink &&
        props.titleOnTouch &&
        <Center onTouch={props.titleOnTouch}>
          {props.title}
        </Center>}
      {!props.titleLink &&
        !props.titleOnTouch &&
        <Center>
          {props.title}
        </Center>}
      <Side />
    </WidthRestrict>
  </Base>;

Base.defaultProps = {
  theme: {
    headerText: 'black',
    headerBackground: 'white',
    headerBottomLine: 'grey',
  },
};

export default Header;
