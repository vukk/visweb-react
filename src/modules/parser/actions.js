import { createAction } from 'redux-actions';

export const PARSER = {
  PARSE: 'parser/PARSE',
  PARSE_RESULT: 'parser/PARSE_RESULT',
  PARSE_ERROR: 'parser/PARSE_ERROR',
};

const parse = createAction(PARSER.PARSE);
const parseResult = createAction(PARSER.PARSE_RESULT);
const parseError = createAction(PARSER.PARSE_ERROR);

export const types = PARSER;
export const actions = { parse, parseResult, parseError };

export default actions;
