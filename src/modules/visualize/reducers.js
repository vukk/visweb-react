import { types as VISUALIZE } from './actions';

const defaultState = {
  data: null,
  options: null,
  ready: false,
};
export const visualizeReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case VISUALIZE.SETUP:
      return { ...state, data: action.payload.data, options: action.payload.options };
    case VISUALIZE.READY:
      return { ...state, ready: true };
    case VISUALIZE.DESTROY:
      return { ...state, ready: false };
    default:
      return state;
  }
};

export default visualizeReducer;
