import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { createDancerAction } from '../../../redux/actions';
import { GENDERS } from '../../../constants';


class DancersNew extends Component {
  onSubmit = (values) => {
    this.props.createDancerAction(values);
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label htmlFor={`${field.name}New`}>{field.label}</label>
        <input id={`${field.name}New`} className="form-control" type="text" {...field.input} />
        <div className="text-help">
          { touched ? error : '' }
        </div>
      </div>
    );
  }

  renderRadio(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        {
          GENDERS.map(gender => (
            <label htmlFor={`genderNew${gender}`} key={gender}>
              <Field name="gender" id={`genderNew${gender}`} component="input" type="radio" value={gender} />
              {' '}
              {gender}
            </label>
          ))
        }
        <div className="text-help">
          { touched ? error : '' }
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;
    return (
      <div className="DancersNew">
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

          <div className="DancersNew__buttons">
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

DancersNew.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  createDancerAction: PropTypes.func.isRequired,
};

const afterSubmit = (result, dispatch) => dispatch(reset('DancersNewForm'));

export default reduxForm({
  validate,
  form: 'DancersNewForm',
  onSubmitSuccess: afterSubmit,
})(connect(null, { createDancerAction })(DancersNew));
