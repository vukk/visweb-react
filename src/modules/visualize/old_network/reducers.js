import { types as VISUALIZE_OLD_NETWORK } from './actions';

const defaultState = {
  test: 'yes',
  data: null,
  options: null,
  playing: true,
  interval: 8,
  currentModel: 0,
  numModels: 0,
  dist: 1,
};
export const visualizeOldNetworkReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case VISUALIZE_OLD_NETWORK.SETUP:
      return {
        ...state,
        data: action.payload.data,
        options: action.payload.options,
        numModels: action.payload.data.Call[0].Witnesses.length,
      };
    case VISUALIZE_OLD_NETWORK.SET_INTERVAL:
      return { ...state, interval: action.payload };
    case VISUALIZE_OLD_NETWORK.FIRST:
      return { ...state, currentModel: 0, dist: state.currentModel };
    case VISUALIZE_OLD_NETWORK.PREVIOUS:
      if (state.currentModel > 1)
        return { ...state, currentModel: state.currentModel-1, dist: 1 };
      else
        return state;
    case VISUALIZE_OLD_NETWORK.PLAY:
      return { ...state, playing: true };
    case VISUALIZE_OLD_NETWORK.PAUSE:
      return { ...state, playing: false };
    case VISUALIZE_OLD_NETWORK.NEXT:
      if (state.currentModel < state.numModels)
        return { ...state, currentModel: state.currentModel+1, dist: 1 };
      else
        return state;
    case VISUALIZE_OLD_NETWORK.LAST:
      return { ...state,
        currentModel: state.numModels,
        dist: state.numModels - state.currentModel
      };
    default:
      return state;
  }
};

export default visualizeOldNetworkReducer;
