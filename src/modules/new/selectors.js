
export const getFile = state => {
  return {
    type: state.new.detectFileTypeResult,
    text: state.form.new_form.values.filecontents,
  };
}

export const getOptions = state => {
  return state.form.new_form.values;
}

export default {
  getFile,
  getOptions,
}
