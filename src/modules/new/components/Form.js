import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';

import Button from '../../../common/components/Button';

import Dropzone from 'react-dropzone';

const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const dropzoneStyle = {
  padding: '1em',
  border: 'none',
  boxShadow: '0px 2px 4px rgba(0,0,0,0.7)',
}

const ZoneContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ZoneResult = styled.div`
  margin-top: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ZoneError = styled(ZoneResult)`
  background-color: indianred;
`;

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  const onChange = (val) => {
    const newVal = val.map(file => {
      return {
        'name': file.name,
        'fileObjClears': file,
        'size': file.size,
        'type': file.type,
        'lastModified': file.lastModified,
      }
    });
    console.log('Mapped vals', newVal);
    // field.input.onChange([val[0], {'name': val[0].name}])
    field.input.onChange(newVal);
  }
  return (
    <div>
      <Dropzone
        name={field.name}
        style={dropzoneStyle}
        onDrop={filesToUpload => onChange(filesToUpload)}
        value={field.input.value}
      >
        <ZoneContent>
          Drop file here or&nbsp;
          <Button primary type="button">Select file</Button>
        </ZoneContent>
      </Dropzone>

      {field.meta.touched &&
        field.meta.error &&
        <ZoneError>{field.meta.error}</ZoneError>}

      {files && Array.isArray(files) && (
        <ZoneResult>
          <div>Selected file:</div>
          <div>
            {files && Array.isArray(files) && (
              <ul>{ files.map((file, i) => <li key={i}>{file.name}</li>) }</ul>
            )}
          </div>
        </ZoneResult>
      )}
    </div>
  );
}

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Elem = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;

  ${Section} + ${Section} {
      margin-top: 1em;
  }
`;

const Item = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
`;

const Title = styled.h2`
  margin-top: 0;
`;

const Form = props => {
  const { handleSubmit, pristine, submitting } = props;
  const onChange = (e) => {
    console.log('CHANGE event', e);
    // const reader = new FileReader();
    // const newVal = e[0].map(file => {
    const file = e[0].fileObjClears;
    const reader = new FileReader();
    reader.onload = () => {
        props.dispatch(props.change('filecontents', reader.result));
    }; // @TODO FIX ERROR ABORT HANDLING
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.readAsText(file);
  }
  console.log('PROPS', props);
  const OptionsComponent = props.visualizerChosen
    ? props.visualizerOptionComponents[props.visualizerChosen]
    : null;
  return (
    <Elem>
      <Section>
        <Title><label htmlFor='files'>Choose log file</label></Title>
        <Field
          name='files'
          type="file"
          component={renderDropzoneInput}
          onChange={onChange}
          value={undefined}
          validate={[required]}
        />
      </Section>
      <Section>
        <Title>Visualizer</Title>
        <Item>
          {Object.entries(props.visualizerChoices).map(([key, name]) =>
            <div key={key}>
              <Field name="visualizer" component="input" type="radio" value={key} />
              &nbsp;<label htmlFor={key}>{name}</label>
            </div>
          )}
        </Item>
      </Section>
      {props.visualizerChosen && <Section>
        <Title><label>Visualizer options</label></Title>
        {<OptionsComponent />}
      </Section>}
      <Section>
        <Button primary type="button" onClick={handleSubmit} disabled={pristine || submitting}>
          Parse & Launch
        </Button>
      </Section>
      {props.parseError && (
        <Section>
          <Title>Parsing error</Title>
          {props.parseError.name} - {props.parseError.message}<br />
          (at line {props.parseError.location.start.line},
          column {props.parseError.location.start.column})
        </Section>
      )}
    </Elem>
  );
};

export default reduxForm({
  form: 'new_form', // a unique identifier for this form
})(Form);
