import React from 'react';
import styled, { css } from 'styled-components';

import { IoIosMenu } from 'react-icons/io';

const MenuIcon = styled(IoIosMenu)`
  ${props => props.size && css`width: ${props.size}; height: ${props.size};`}
  ${props => !props.size && css`width: 3em; height: 3em;`}
  `;

const MenuButton = props => <MenuIcon {...props} className={props.className} />;

export default MenuButton;
