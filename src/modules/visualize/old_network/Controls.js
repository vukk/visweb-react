import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Controls from './components/Controls';

import actions from './actions';

const mapStateToProps = state => {
  return { ...state.visualizers['old_network'] };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
