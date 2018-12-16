import React from 'react';
import styled, { css } from 'styled-components';

import CanvasRecorder from '../canvasrecorder';

import MenuButton from '../../common/components/MenuButton';
import Logo from '../../common/components/Logo';
import WidthRestrict from '../../common/components/WidthRestrict';

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
  flex-basis: 10%;
`;

const Left = styled(Side)`
  text-align: left;
  display: flex;
  flex-direction: row;
  // justify-content: center;
  // align-items: left;
`;

const Center = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  flex-basis: 100%;

  font-size: 20px;
`;

const MenuBtn = styled(MenuButton)`margin-left: 0.5em;`;

// https://webrtc.github.io/samples/src/content/capture/canvas-record/
// record/stop and download buttons, make download activated and green when
// a recording is ready to dl
// Ion videocam Ion square, Ion save OR Ion archive
// Might add link to new with Ion add-circle
const Header = props =>
  <Base className={props.className}>
    <WidthRestrict>
      <Left>
        <div>
          <MenuBtn onClick={props.openMenu} size="2.0em">MenuBtn</MenuBtn></div>
          <CanvasRecorder />
      </Left>
      <Center>{props.controls}</Center>
      <Side><Logo primary size="12" /></Side>
    </WidthRestrict>
  </Base>;

Base.defaultProps = {
  theme: {
    headerText: 'black',
    headerBackground: 'white',
    headerBottomLine: 'grey',
  },
};

// {props.titleLink &&
//   <Link to={props.titleLink}>
//     <Center>
//       {props.title}
//     </Center>
//   </Link>}
// {!props.titleLink &&
//   props.titleOnTouch &&
//   <Center onTouch={props.titleOnTouch}>
//     {props.title}
//   </Center>}
// {!props.titleLink &&
//   !props.titleOnTouch &&
//   <Center>
//     {props.title}
//   </Center>}

export default Header;
