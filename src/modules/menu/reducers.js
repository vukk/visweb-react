import { types as MENU } from './actions';

export const menuReducer = (state = { open: false }, action = {}) => {
  switch (action.type) {
    case MENU.OPEN:
      return { ...state, open: true };
    case MENU.CLOSE:
      return { ...state, open: false };
    default:
      return state;
  }
};

export default menuReducer;
