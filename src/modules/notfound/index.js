import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NotFound from './components/NotFound';

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
