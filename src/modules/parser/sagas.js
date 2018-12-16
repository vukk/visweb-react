import { fork, takeEvery, put } from 'redux-saga/effects';
import actions, { types } from './actions';

import parserAspTerms from './aspterms';
import parserSolverLogToJson from './solver-txt-to-json';

// TODO: saga gives error flag? so we can just use PARSE_RESULT and give it err?
function* parse(action) {
  // let toParse = null;
  if (action.payload.type === 'clingo_log') {
    // First, parse clingo log to JSON
    try {
      const result = parserSolverLogToJson.parse(action.payload.text);
      yield put(actions.parseResult(result));
    } catch(err) {
      yield put(actions.parseError(err));
    }
  } else if (action.payload.type === 'clingo_json') {
    const result = JSON.parse(action.payload.text);
    yield put(actions.parseResult(result));
  } else if (action.payload.type === 'aspterms') {
    const result = parserAspTerms.parse(action.payload.text);
    yield put(actions.parseResult(result));
  } else {
    const err = Error(`Unknown type "${action.payload.type}" requested.`);
    yield put(actions.parseError(err));
  }
}

export default function* root() {
  yield takeEvery(types.PARSE, parse);
}
