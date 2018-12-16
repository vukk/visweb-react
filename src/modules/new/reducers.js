import { types as NEW } from './actions';

const defaultState = {
  detectFileType: false,
  detectFileTypeResult: null,
  detectFileTypeError: null,
  parse: false, parseResult: null, parseError: null,
};
export const newReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case NEW.DETECT_FILE_TYPE:
      return { ...state, detectFileType: true };
    case NEW.DETECT_FILE_TYPE_RESULT:
      return { ...state,
        detectFileType: false,
        detectFileTypeResult: action.payload,
        detectFileTypeError: null,
      };
    case NEW.DETECT_FILE_TYPE_ERROR:
      return { ...state,
        detectFileType: false,
        detectFileTypeResult: null,
        detectFileTypeError: null,
      };
    case NEW.PARSE:
      return { ...state, parse: true };
    case NEW.PARSE_RESULT:
      return { ...state,
        parse: false,
        parseResult: action.payload,
        parseError: null,
      };
    case NEW.PARSE_ERROR:
      return { ...state,
        parse: false,
        parseResult: null,
        parseError: action.payload,
      };
    default:
      return state;
  }
};

export default newReducer;
