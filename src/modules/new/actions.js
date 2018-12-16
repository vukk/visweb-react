import { createAction } from 'redux-actions';

export const NEW = {
  FORM_SUBMIT: 'new/FORM_SUBMIT',
  DETECT_FILE_TYPE: 'new/DETECT_FILE_TYPE',
  DETECT_FILE_TYPE_RESULT: 'new/DETECT_FILE_TYPE_RESULT',
  DETECT_FILE_TYPE_ERROR: 'new/DETECT_FILE_TYPE_ERROR',
  PARSE: 'new/PARSE',
  PARSE_RESULT: 'new/PARSE_RESULT',
  PARSE_ERROR: 'new/PARSE_ERROR',
};

const formSubmit = createAction(NEW.FORM_SUBMIT);
const detectFileType = createAction(NEW.DETECT_FILE_TYPE);
const detectFileTypeResult = createAction(NEW.DETECT_FILE_TYPE_RESULT);
const detectFileTypeError = createAction(NEW.DETECT_FILE_TYPE_ERROR);
const parse = createAction(NEW.PARSE);
const parseResult = createAction(NEW.PARSE_RESULT);
const parseError = createAction(NEW.PARSE_ERROR);

export const types = NEW;
export const actions = {
  formSubmit,
  detectFileType, detectFileTypeResult, detectFileTypeError,
  parse, parseResult, parseError,
};

export default actions;
