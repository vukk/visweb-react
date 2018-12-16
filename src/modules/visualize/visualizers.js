
import { combineReducers } from 'redux';

// import NetworkOptions from './network/Options';
// import NetworkVisualize from './network/Visualize';

import OldNetworkControls from './old_network/Controls';
import OldNetworkOptions from './old_network/Options';
import OldNetworkVisualize from './old_network';
import oldNetworkActions from './old_network/actions';
import oldNetworkReducer from './old_network/reducers';
import { default as oldNetworkSagas } from './old_network/sagas';

// TODO: Load actions, reducers and sagas in under visualize/sagas etc.
// similarly as in main, but subcat?
export default {
  'available': {
    //'network': 'Network (force-directed)',
    'old_network': 'VisJS (force-directed)',
  },
  'components': {
    'help': {},
    'options': {
      //'network': NetworkOptions,
      'old_network': OldNetworkOptions,
    },
    'visualizers': {
      //'network': NetworkVisualize,
      'old_network': OldNetworkVisualize,
    },
    'controls': {
      'old_network': OldNetworkControls,
    }
  },
  'optionDefaults': {
    // remember to prefix options by visualizer name
    //'network_mode': '2d',
    'old_network_directed': true,
  },
  'actions': {
    'old_network': oldNetworkActions,
  },
  'reducers': combineReducers({
    'old_network': oldNetworkReducer,
  }),
  'sagas': {
    'old_network': oldNetworkSagas,
  }
}
