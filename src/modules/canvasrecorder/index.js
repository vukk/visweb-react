import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './actions';

import Controls from './components/Controls';

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
