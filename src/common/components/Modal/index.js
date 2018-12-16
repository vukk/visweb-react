import React from 'react';
import styled, { css } from 'styled-components';

import onClickOutside from 'react-onclickoutside';

import Card from '../../../common/components/Card';

// Always fills the page
const Background = styled.div`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgb(0, 0, 0); /* Fallback */
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const PageContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  cursor: default;
`;

// onClickOutSide for CardContainer, does closeModal
const CardContainer = styled(PageContainer)`
  ${props => props.marginLeft && css`margin-left: ${props.marginLeft};`};
  ${props => props.marginRight && css`margin-right: ${props.marginRight};`};
  ${props => props.marginTop && css`margin-top: ${props.marginTop};`};
  ${props => props.marginBottom && css`margin-bottom: ${props.marginBottom};`};
`;

class OutsideClickHandlerInner extends React.Component {
  handleClickOutside() {
    this.props.handleClickOutside();
  }

  render() {
    return this.props.children;
  }
}
const OutsideClickHandler = onClickOutside(OutsideClickHandlerInner);

const Modal = props => {
  const { isOpen, closeModal, ...passProps } = props;
  return (
    <Background isOpen={props.isOpen}>
      {props.fullScreen
        ? <PageContainer {...passProps}>
            {props.children}
          </PageContainer>
        : <OutsideClickHandler
            disableOnClickOutside={!isOpen}
            excludeScrollbar={true}
            handleClickOutside={props.closeModal}
            /* having touchend will result in any links below being activated */
            /* having only click seems to work fine */
            eventTypes={['click']}
          >
            <CardContainer {...passProps}>
              <Card>
                {props.children}
              </Card>
            </CardContainer>
          </OutsideClickHandler>}
    </Background>
  );
};

export default Modal;
