import { types as CANVASRECORDER } from './actions';

export const canvasrecorderReducer = (state = { rec: false }, action = {}) => {
  switch (action.type) {
    case CANVASRECORDER.TOGGLE:
      return { ...state, rec: !state.rec };
    default:
      return state;
  }
};

export default canvasrecorderReducer;
