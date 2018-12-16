import { createAction } from 'redux-actions';

export const VISUALIZE = {
  SETUP: 'visualize/SETUP',
  READY: 'visualize/READY',
  DESTROY: 'visualize/DESTROY',
};

const setup = createAction(VISUALIZE.SETUP);
const ready = createAction(VISUALIZE.READY);
const destroy = createAction(VISUALIZE.DESTROY);

export const types = VISUALIZE;
export const actions = { setup, ready, destroy };

export default actions;
