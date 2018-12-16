import { createAction } from 'redux-actions';

export const VISUALIZERS_OLD_NETWORK = {
  SETUP: 'visualizers/old_network/SETUP',
  CREATE: 'visualizers/old_network/CREATE',
  DESTROY: 'visualizers/old_network/DESTROY',
  FIRST: 'visualizers/old_network/FIRST',
  PREVIOUS: 'visualizers/old_network/PREVIOUS',
  PLAY: 'visualizers/old_network/PLAY',
  PAUSE: 'visualizers/old_network/PAUSE',
  NEXT: 'visualizers/old_network/NEXT',
  LAST: 'visualizers/old_network/LAST',
  SET_INTERVAL: 'visualizers/old_network/SET_INTERVAL',
  ATTACH_TIMER_DISPLAY: 'visualizers/old_network/ATTACH_TIMER_DISPLAY',
  DEATTACH_TIMER_DISPLAY: 'visualizers/old_network/DEATTACH_TIMER_DISPLAY',
};

const setup = createAction(VISUALIZERS_OLD_NETWORK.SETUP);
const create = createAction(VISUALIZERS_OLD_NETWORK.CREATE);
const destroy = createAction(VISUALIZERS_OLD_NETWORK.DESTROY);
const first = createAction(VISUALIZERS_OLD_NETWORK.FIRST);
const previous = createAction(VISUALIZERS_OLD_NETWORK.PREVIOUS);
const play = createAction(VISUALIZERS_OLD_NETWORK.PLAY);
const pause = createAction(VISUALIZERS_OLD_NETWORK.PAUSE);
const next = createAction(VISUALIZERS_OLD_NETWORK.NEXT);
const last = createAction(VISUALIZERS_OLD_NETWORK.LAST);
const setInterval = createAction(VISUALIZERS_OLD_NETWORK.SET_INTERVAL);
const attachTimerDisplay = createAction(VISUALIZERS_OLD_NETWORK.ATTACH_TIMER_DISPLAY);
const deattachTimerDisplay = createAction(VISUALIZERS_OLD_NETWORK.DEATTACH_TIMER_DISPLAY);

export const types = VISUALIZERS_OLD_NETWORK;
export const actions = {
  setup, create, destroy,
  first, previous, play, pause, next, last, setInterval,
  attachTimerDisplay, deattachTimerDisplay,
};

export default actions;
