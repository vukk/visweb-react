import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './actions';

import PageBase from '../../../common/components/PageBase';

// import OldNetworkVisualizer from './OldNetworkVisualizer';

const Container = styled.div`
  flex: 1;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // text-align: center;
  // justify-content: center;
`;

class DynamicGraph extends React.Component {
  constructor(props) {
    super(props);
    this.el = null;
    // this.viz = null;
    // this.parser = props.parser;
    // this.data = null;
    // this.options = null;
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.setup({data: this.props.data, options: this.props.options});
    this.props.create(this.el);
  }

  componentWillUnmount() {
    this.props.destroy();
  }

  render() {
    return <PageBase className={this.props.className}>
      <Container ref={el => { this.el = el; }} />
    </PageBase>;
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  // Add dispatch to props
  // return { ...bindActionCreators({ ...actions }, dispatch), dispatch };
  return bindActionCreators({ ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicGraph);
