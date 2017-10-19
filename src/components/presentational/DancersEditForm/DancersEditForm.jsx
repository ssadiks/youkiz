import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { updateDancerAction, fetchDancerAction } from '../../../redux/actions';
import { GENDERS } from '../../../constants';

class DancersEditForm extends Component {
  onSubmit = (values) => {
    const { selectedDancer } = this.props;

    this.props.updateDancerAction(selectedDancer, values);
    this.props.resetDancerDetails();
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
    const { handleSubmit, resetDancerDetails } = this.props;

    return (
      <div className="DancersEditForm">
        {
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              label="Name"
              name="name"
              component={this.renderField}
            />
            <Field
              label="Gender"
              name="gender"
              component={this.renderRadio}
            />
            <div className="DancersNewForm__form__group DancersNewForm__buttons">
              <RaisedButton onClick={resetDancerDetails} label="Back" secondary />
              <RaisedButton className="DancersNew__buttons__filter" type="submit" label="Edit" primary />
            </div>
          </form>
        }
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

DancersEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  updateDancerAction: PropTypes.func.isRequired,
  fetchDancerAction: PropTypes.func.isRequired,
  resetDancerDetails: PropTypes.func.isRequired,
  selectedDancer: PropTypes.string.isRequired,
};

DancersEditForm = reduxForm({
  validate,
  form: 'DancersEditForm',
  enableReinitialize: true,
})(DancersEditForm);

DancersEditForm = connect(
  state => ({
    dancerDetails: state.dancersReducer.dancerDetails,
    isPending: state.videosReducer.isPending,
    error: state.videosReducer.error,
    initialValues:
      {
        name: state.dancersReducer.dancerDetails && state.dancersReducer.dancerDetails.name,
        gender: state.dancersReducer.dancerDetails && state.dancersReducer.dancerDetails.gender
      }
  }),
  { fetchDancerAction, updateDancerAction }
)(DancersEditForm);

export default DancersEditForm;

