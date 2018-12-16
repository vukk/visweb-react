import { createAction } from 'redux-actions';

export const MENU = {
  OPEN: 'menu/MENU_OPEN',
  CLOSE: 'menu/MENU_CLOSE',
};

const open = createAction(MENU.OPEN);
const close = createAction(MENU.CLOSE);

export const types = MENU;
export const actions = { open, close };

export default actions;
