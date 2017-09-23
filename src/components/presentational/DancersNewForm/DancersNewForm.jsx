import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, reset as resetForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { createDancerAction } from '../../../redux/actions';
import { GENDERS } from '../../../constants';


class DancersNewForm extends Component {
  onSubmit = (values) => {
    this.props.createDancerAction(values);
  }

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

  renderRadio(field) {
    const { meta: { touched, error } } = field;
    const className = `DancersNewForm__form__group ${touched && error ? 'has-error' : ''}`;

    return (
      <div className={className}>
        <RadioButtonGroup {...field.input} valueSelected={field.input.value}>
          {
            GENDERS.map(gender => (
              <RadioButton
                key={gender}
                value={gender}
                label={gender}
              />
            ))
          }
        </RadioButtonGroup>
        <div className="text-help">
          { touched ? error : '' }
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <div className="DancersNewForm">
        <form className="DancersNewForm__form" onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            label="Name"
            name="name"
            component={this.renderField}
          />
          {
            <Field
              label="Gender"
              name="gender"
              component={this.renderRadio}
            />
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

  if (!values.name) {
    errors.name = 'Enter a name';
  }

  if (!values.gender) {
    errors.gender = 'Select a gender';
  }

  return errors;
}

DancersNewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  createDancerAction: PropTypes.func.isRequired,
};

const afterSubmit = (result, dispatch) => dispatch(resetForm('DancersNewForm'));

export default reduxForm({
  validate,
  form: 'DancersNewForm',
  onSubmitSuccess: afterSubmit,
})(connect(null, { createDancerAction })(DancersNewForm));
