import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, reset as resetForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { createDancerAction } from '../../../redux/actions';

import { GENDERS, DANCES_STYLE } from '../../../constants';
import Select from 'react-select';
import { changePropretiesOfObjectInArray, getArrayOfValue } from '../../../helpers';


class VideosNewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeDance: null,
      dancersTab: []
    };
  }

  onSubmit = (values) => {
    // this.props.createDancerAction(values);
    console.log('values', values);
  }

  handleChangeTypeDance = (typeDance) => {
    console.log('typeDance', typeDance);
    this.setState({ typeDance });
  };

  renderField(field) {
    const { meta: { touched, error } } = field;

    return (
      <div className="DancersNewForm__form__group">
        <TextField
          hintText={field.label}
          {...field.input}
          errorText={touched ? error : ''}
        />
      </div>
    );
  }

  renderSelect = (field) => {
    const { meta: { touched, error } } = field;
    const DANCES_STYLE_SELECT = changePropretiesOfObjectInArray(DANCES_STYLE, ['id', 'name'], ['value', 'label']);

    console.log('field', field);
    return (
      <div className="DancersNewForm__form__group">
        <Select
          name="form-field-name"
          options={DANCES_STYLE_SELECT}
          onChange={this.handleChangeTypeDance}
          {...field.input}
          simpleValue
          placeholder="Select a dance style"
        />
      </div>
    );
  }

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <div className="DancersNewForm">
        <form className="DancersNewForm__form" onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            label="Video Id"
            name="videoId"
            component={this.renderField}
          />
          <Field
            label="Song"
            name="song"
            component={this.renderField}
          />
          {
            <Field
              label="Dances style"
              name="dancesStyle"
              component={this.renderSelect}
            />
          }
          {
            /*
            <Field name="favoriteColor" component="select">
              <option />
              <option value="ff0000">Red</option>
              <option value="00ff00">Green</option>
              <option value="0000ff">Blue</option>
            </Field>
          */
          }
          <div className="DancersNewForm__form__group DancersNewForm__buttons">
            <RaisedButton onClick={reset} label="Reset" disabled={pristine || submitting} secondary />
            <RaisedButton className="DancersNew__buttons__filter" type="submit" label="Create" primary />
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.videoId) {
    errors.videoId = 'Enter a video Id';
  }

  if (!values.gender) {
    errors.gender = 'Select a gender';
  }

  return errors;
}

VideosNewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  createDancerAction: PropTypes.func.isRequired,
};

const afterSubmit = (result, dispatch) => dispatch(resetForm('VideosNewForm'));

export default reduxForm({
  validate,
  form: 'VideosNewForm',
  onSubmitSuccess: afterSubmit,
})(connect(null, { createDancerAction })(VideosNewForm));
