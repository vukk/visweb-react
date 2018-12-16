import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './modules/main/App';

import configureStore from './configureStore';

const initialState = {
  // Most initialState should go to reducer files, but e.g. intl stuff would be
  // appropriate to put here.
};
const store = configureStore(initialState);

const Root = () => <Provider store={store}><App /></Provider>;

ReactDOM.render(<Root />, document.getElementById('root'));
