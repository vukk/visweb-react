import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './actions';

import Menu from './components/Menu';

const mapStateToProps = state => {
  return { ...state.menu };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ closeMenu: actions.close, }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
