// NEXT move from saga to visualize if they pass, or show helpful errors on /new if not
import { takeEvery, put, take, select } from 'redux-saga/effects';
import actions, { types } from './actions';
import { getFile, getOptions } from './selectors';

import parserActions, { types as parserTypes } from '../parser/actions';
import visualizeActions from '../visualize/actions';

function* formSubmit() {
  yield put(actions.detectFileType());
  yield take(types.DETECT_FILE_TYPE_RESULT);
  yield put(actions.parse());
}

function* detectFileType() {
  // TODO @ADD support for other file types
  yield put(actions.detectFileTypeResult('clingo_log'));
}

function* parse() {
  const file = yield(select(getFile));
  // Outsource to parser module
  yield put(parserActions.parse(file));
  // Wait for result
  const parsedAction = yield take([parserTypes.PARSE_RESULT, parserTypes.PARSE_ERROR]);
  if (parsedAction.error) yield put(actions.parseError(parsedAction.payload));
  else yield put(actions.parseResult(parsedAction.payload));
}

function* parseResult(action) {
  const options = yield(select(getOptions));
  yield put(visualizeActions.setup({
    data: action.payload,
    options,
  }));
  yield put({ type: 'VISUALIZE' }); // navigate
}

export default function* root() {
  yield takeEvery(types.FORM_SUBMIT, formSubmit);
  yield takeEvery(types.DETECT_FILE_TYPE, detectFileType);
  yield takeEvery(types.PARSE, parse);
  yield takeEvery(types.PARSE_RESULT, parseResult);
}
