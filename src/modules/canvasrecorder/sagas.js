// import { fork, takeEvery, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
// import actions, { types } from './actions';
import { types } from './actions';

import { types as visualizeActionTypes } from '../visualize/actions';

// SAGA STATIC/GLOBALS
let canvas = null;

const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
let mediaRecorder = null;
let recordedBlobs = [];
let sourceBuffer;
let recordingState = false;

let stream;

// const stream = canvas.captureStream(); // frames per second
// console.log('Started stream capture from canvas element: ', stream);

/* eslint-disable-next-line require-yield */
function* setup(action) {
  console.log('RECORDER SETUP', action.payload);
  recordingState = false;
  canvas = action.payload.canvas;

  stream = canvas.captureStream();
  console.log('Started stream capture from canvas element: ', stream);
}

/* eslint-disable-next-line require-yield */
function* toggle(action) {
  if (recordingState === false) {
    recordingState = true;
    startRecording();
  }
  else {
    recordingState = false;
    mediaRecorder.stop();
    console.log('Recorded Blobs: ', recordedBlobs);
  }
}

// Non-sagas
function startRecording() {
  let options = {mimeType: 'video/webm'};
  recordedBlobs = [];
  try {
    mediaRecorder = new MediaRecorder(stream, options);
  } catch (e0) {
    console.log('Unable to create MediaRecorder with options Object: ', e0);
    try {
      options = {mimeType: 'video/webm,codecs=vp9'};
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (e1) {
      console.log('Unable to create MediaRecorder with options Object: ', e1);
      try {
        options = 'video/vp8'; // Chrome 47
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e2) {
        alert('MediaRecorder is not supported by this browser.\n\n' +
          'Try Firefox 29 or later, or Chrome 47 or later, ' +
          'with Enable experimental Web Platform features enabled from chrome://flags.');
        console.error('Exception while creating MediaRecorder:', e2);
        return;
      }
    }
  }
  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  //recordButton.textContent = 'Stop Recording';
  //playButton.disabled = true;
  //downloadButton.disabled = true;
  //mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(100); // collect 100ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

/* eslint-disable-next-line require-yield */
function* download() {
  if (!recordedBlobs || recordedBlobs.length === 0)
    return;

  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'visingo.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}

export default function* root() {
  yield takeEvery(visualizeActionTypes.READY, setup); // TODO UGLY
  yield takeEvery(types.TOGGLE, toggle);
  yield takeEvery(types.DOWNLOAD, download);
}
