import { fork, takeEvery, take, put, select, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga'
import actions, { types } from './actions';
import { getOptions, getData, getPlaybackState } from './selectors';

import visualizerActions from '../actions';

import Tock from 'tocktimer';

import parserAspTerms from '../../parser/aspterms';
import OldNetworkVisualizer from './OldNetworkVisualizer';

// SAGA STATIC/GLOBALS
let timerDisplayElement = null;
let vis = null;
let visElem = null;
const timerTick = args => {
  if (timerDisplayElement) {
    // ms to seconds, then round to one decimal place
    // timerDisplayElement.value = Math.round((tock.lap()/1000) * 10) / 10
    const lap = Math.max(tock.lap(), 0);
    timerDisplayElement.value = (Math.round((lap/100)) / 10).toFixed(1);
  }
}
let tock = null;


function createTockChannel() {
  return eventChannel(emit => {

    const completionHandler = event => {
      // puts event payload into the channel
      // this allows a Saga to note this event on the returned channel
      emit(event)
    }

    // setup the subscription
    tock = new Tock({
      countdown: true,
      // interval: 16, // 16ms ~ 60fps
      interval: 100, // 100ms resolution is enough for us
      callback: timerTick, // req for display
      complete: completionHandler, // trigger next, queue next one
    });

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      if (tock && tock.go) tock.stop();
      tock = null;
    }

    return unsubscribe
  });
}

function* create(action) {
  if (tock !== null) {
    if (tock.go) tock.stop();
    tock = null;
  }

  visElem = action.payload;
  if (vis !== null) {
    vis.reset();
    vis = null;
  }

  const options = yield select(getOptions);
  const directed = options['old_network_directed']; // TODO?

  // Set globals
  vis = new OldNetworkVisualizer(visElem, { directed }, parserAspTerms);
  const chan = yield call(createTockChannel);
  yield fork(timerCompletion, chan);

  // Mark as ready on the upper level
  yield(put(visualizerActions.ready({ element: visElem, canvas: vis.canvas})));

  // First
  yield(put(actions.next()));
}

/* eslint-disable-next-line require-yield */
function* destroy() {
  if (vis !== null) {
    vis.reset();
    vis = null;
  }
  if (tock !== null) {
    if (tock.go) tock.stop();
    tock = null;
  }
  visElem = null;

  // Mark destroyed on the upper level
  yield(put(visualizerActions.destroy()));
}

// This maps the tock completions to NEXT events by listening on the channel
function* timerCompletion(channel) {
  while (true) {
    try {
      // An error from channel will cause the saga jump to the catch block
      yield take(channel);
      yield put(actions.next());
    } catch(err) {
      console.error('Tock error', err)
      if (tock) {
        if (tock.go) tock.stop();
        tock = null;
      }
    }
  }
}

/* eslint-disable-next-line require-yield */
function* attachTimerDisplay(action) {
  timerDisplayElement = action.payload;
}

/* eslint-disable-next-line require-yield */
function* deattachTimerDisplay() {
  timerDisplayElement = null;
}

function* first() {
  // Works by full reset
  yield put(actions.create(visElem));
}

function* previous() {
  if (tock && tock.go) {
    tock.stop();
    tock.reset();
  }

  vis.undo();
  // vis.flushChanges(); // ?

  const playbackState = yield select(getPlaybackState);
  // Queue next change
  if (tock && playbackState.playing
      && playbackState.currentModel < playbackState.numModels) {
    tock.start(playbackState.interval * 1000);
  }
}

function* play() {
  // If already playing
  if(tock && tock.go)
    return;

  const playbackState = yield select(getPlaybackState);

  // If paused, call pause to resume
  if(tock && tock.pause_time
      && playbackState.currentModel < playbackState.numModels)
    return tock.pause();

  // Otherwise start playing if we are not in the end
  if (tock && !tock.go && playbackState.playing
      && playbackState.currentModel < playbackState.numModels) {
    tock.start(playbackState.interval);
  }
}

function* pause() {
  const playbackState = yield select(getPlaybackState);
  if (tock && tock.go && !playbackState.playing) {
    tock.pause();
    if (timerDisplayElement) {
      // ms to seconds, then round to one decimal place
      // timerDisplayElement.value = Math.round((tock.lap()/1000) * 10) / 10
      timerDisplayElement.value = (Math.round((tock.pause_time/100)) / 10).toFixed(1);
    }
  }
}

function* next() {
  if (tock && tock.go) {
    tock.stop();
    tock.reset();
  }

  const data = yield select(getData);
  const playbackState = yield select(getPlaybackState);
  const witnesses = data.Call[0].Witnesses;
  vis.queueAnswerSet(
      witnesses[playbackState.currentModel - 1].Value
  );
  vis.flushChanges();

  // Queue next change
  if (tock && playbackState.playing
      && playbackState.currentModel < playbackState.numModels) {
    tock.start(playbackState.interval * 1000);
  }
}

function* last() {
  if (tock && tock.go) {
    tock.stop();
    tock.reset();
  }

  const data = yield select(getData);
  const playbackState = yield select(getPlaybackState);
  const witnesses = data.Call[0].Witnesses;

  const end = playbackState.numModels;
  const cur = playbackState.numModels - playbackState.dist;
  // queue all the rest
  for(let i = cur; i < end; i++) {
    vis.queueAnswerSet(
        witnesses[i].Value // NOTE: no -1, (i < end) and cur is already there
    );
  }
  // then flush
  vis.flushChanges();

  timerDisplayElement.value = (0).toFixed(1);
}

export default function* root() {
  yield takeEvery(types.CREATE, create);
  yield takeEvery(types.DESTROY, destroy);
  yield takeEvery(types.ATTACH_TIMER_DISPLAY, attachTimerDisplay);
  yield takeEvery(types.DEATTACH_TIMER_DISPLAY, deattachTimerDisplay);
  yield takeEvery(types.FIRST, first);
  yield takeEvery(types.PREVIOUS, previous);
  yield takeEvery(types.PLAY, play);
  yield takeEvery(types.PAUSE, pause);
  yield takeEvery(types.NEXT, next);
  yield takeEvery(types.LAST, last);
}
