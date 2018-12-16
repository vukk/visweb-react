import React from 'react';
import styled from 'styled-components';

import Link from 'redux-first-router-link';

import Modal from '../../../common/components/Modal';

import Title from '../../../common/components/Title';
import { Span } from '../../../common/components/Text';
import Button from '../../../common/components/Button';
import ToggleButton from '../../../common/components/ToggleButton';

import Page from './Page';

const Contents = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const ThemeSelect = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    margin-right: 1em;
  }

  > *:last-child {
    margin-right: 0;
  }
`;

const Menu = props => {
  return (
    <Modal
      fullScreen
      className={props.className}
      isOpen={props.open}
      closeModal={props.closeMenu}
    >
      <Page
        noMargin
        title={
          <Title>Menu</Title>
        }
        bottomButton={
          <Button onClick={props.closeMenu}>Back</Button>
        }
      >
        <Contents>
          <Link to="/" key="new" onClick={props.closeMenu}>
            <Button primary>
              New visualization
            </Button>
          </Link>,
          {/*<Link to="/help" key="help" onClick={props.closeMenu}>
            <Button primary>
              Help
            </Button>
          </Link>*/}
          <a href="http://users.ics.aalto.fi/kuuranne/visingo-web/help.html" key="help">
            <Button primary>Help</Button>
          </a>
          ,
          <a href="https://github.com/vukk/visweb-react" key="github">
            <Button primary>GitHub</Button>
          </a>
          {/*<ThemeSelect>
            <Span>Dark/Light theme</Span>
            <ToggleButton
            />
          </ThemeSelect>*/}
        </Contents>
      </Page>
    </Modal>
  );
};
// onClick={changeLang(props.updateIntl)}
// checked={props.locale === 'fi'}

export default Menu;
