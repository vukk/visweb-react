import { createAction } from 'redux-actions';

// Import from modules
import { default as menuActions, types as MENU } from '../menu/actions';
import { default as headerActions, types as HEADER } from '../header/actions';
import { default as newActions, types as NEW } from '../new/actions';
import { default as visualizeActions, types as VISUALIZE } from '../visualize/actions';

import visualizers from '../visualize/visualizers';

// App types @TODO REMOVE
export const APP = {
  THEME_SET: 'main/APP_THEME_SET',
  THEME_SET_SUCCESS: 'main/APP_THEME_SET_SUCCESS',
  THEME_SET_ERROR: 'main/APP_THEME_SET_ERROR',
};

// App actions
const appActions = {
  setTheme: createAction(APP.THEME_SET),
  setThemeSuccess: createAction(APP.THEME_SET_SUCCESS),
  setThemeError: createAction(APP.THEME_SET_ERROR),
};

// Exports
export const types = { APP, HEADER, MENU, NEW, VISUALIZE };
export const actions = {
  app: appActions,
  header: headerActions,
  menu: menuActions,
  new: newActions,
  visualize: visualizeActions,
  visualizers: visualizers.actions,
};

export default actions;
