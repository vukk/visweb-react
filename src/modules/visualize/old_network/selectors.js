
export const getOptions = state => {
  // if (state && state.visualizers && state.visualizers['old_network'])
    return state.visualizers['old_network'].options;
  // else return {};
}

export const getData = state => {
  // if (state && state.visualizers && state.visualizers['old_network'])
    return state.visualizers['old_network'].data;
  // else return {};
}

export const getPlaybackState = state => {
  // if (state && state.visualizers && state.visualizers['old_network']) {
    const { interval, currentModel, numModels, playing, dist }
      = state.visualizers['old_network'];
    return { interval, currentModel, numModels, playing, dist };
  // }
  // else return {};
}

export default {
  getOptions,
  getData,
  getPlaybackState,
}
