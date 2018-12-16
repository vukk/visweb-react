/**
  * Root sagas
  *
  * This file combines sagas from different modules, and contains sagas that
  * have crossing conserns over multiple modules.
  * If this file becomes too long, create a folder named sagas, add an index.js
  * file & other files there. This approach allows you to avoid breaking
  * existing imports.
  */

import { fork, takeEvery } from 'redux-saga/effects';

// Import different sagas here
import { default as canvasrecorderSagas } from '../canvasrecorder/sagas';
import { default as newSagas } from '../new/sagas';
import { default as parserSagas } from '../parser/sagas';
import { default as visualizeSagas } from '../visualize/sagas';

import visualizers from '../visualize/visualizers';

function* watchDebug() {
  yield takeEvery('DEBUG', action =>
    console.debug('[REDUX DEBUG]', action.payload)
  );
}

export default function* root() {
  yield fork(watchDebug);
  yield fork(canvasrecorderSagas);
  yield fork(newSagas);
  yield fork(parserSagas);
  yield fork(visualizeSagas);
  // Sagas for visualizers
  for (const saga of Object.values(visualizers.sagas)) {
    yield fork(saga);
  }
}
