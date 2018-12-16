/**
  * Root reducer
  *
  * This file combines reducers from different modules, and contains reducers
  * that have crossing conserns over multiple modules.
  * If this file becomes too long, create a folder named reducers, add an
  * index.js file & other files there. This approach allows you to avoid
  * breaking existing imports.
  */

// Import different reducers here
import { default as canvasrecorderReducers } from '../canvasrecorder/reducers';
import { default as menuReducers } from '../menu/reducers';
import { default as newReducers } from '../new/reducers';
import { default as visualizeReducers } from '../visualize/reducers';

import visualizers from '../visualize/visualizers';

import { types } from './actions';
const { APP } = types;

const appInitialState = {};

const appReducer = (state = appInitialState, action = {}) => {
  switch (action.type) {
    case APP.THEME_SET:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default {
  // From main:
  app: appReducer,
  // From modules:
  canvasrecorder: canvasrecorderReducers,
  menu: menuReducers,
  new: newReducers,
  visualize: visualizeReducers,
  visualizers: visualizers.reducers,
};
