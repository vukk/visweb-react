import { createAction } from 'redux-actions';

export const CANVASRECORDER = {
  TOGGLE: 'canvasrecorder/TOGGLE',
  DOWNLOAD: 'canvasrecorder/DOWNLOAD',
};

const toggle = createAction(CANVASRECORDER.TOGGLE);
const download = createAction(CANVASRECORDER.DOWNLOAD);

export const types = CANVASRECORDER;
export const actions = { toggle, download };

export default actions;

// TODO NEXT: we have visualize/READY and visualize/DESTROY events, and data
// reduced under visualize.ready. When ready, show recording buttons in the
// header. MediaRecorder and canvas element have to be passed into sagas, via
// event payloads.
// Upon destroy, remove them.
