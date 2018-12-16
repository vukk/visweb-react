import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './actions';

import './App.css';

import New from '../new';
import Menu from '../menu';
import NotFound from '../notfound';
import Visualize from '../visualize';

import { theme as defaultTheme } from './theme';

const AppContainer = styled.div`width: 100vw;`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <AppContainer>
          {this.renderInner()}
          <Menu />
        </AppContainer>
      </ThemeProvider>
    );
  }

  // Routing is here, also see /src/configureStore.js
  // Mapping/passing props between modules happens here.
  renderInner() {
    const payload =
      this.props.location && this.props.location.payload
        ? this.props.location.payload
        : {};
    if (this.props.location.type === 'HOME') {
      return <New {...payload} openMenu={this.props.menuActions.open} />;
    } else if (this.props.location.type === 'VISUALIZE') {
      return <Visualize {...payload} openMenu={this.props.menuActions.open} />;
    } else {
      return <NotFound {...payload} />;
    }
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  // bindActionCreators requires an actionCreator or an object with
  // actionCreators. Our `actions` here is an object of object of actionCreators
  // so we need to iterate over it here.
  const bound = {};
  Object.keys(actions).forEach(
    key => (bound[`${key}Actions`] = bindActionCreators(actions[key], dispatch))
  );
  return bound;
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
