import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createDancerAction } from '../../../redux/actions';
import { GENDERS } from '../../../constants';


class DancersNew extends Component {
  onSubmit = (values) => {
    this.props.createDancerAction(values);
  }

  renderField(field) {
    console.log('field', field)
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label htmlFor="test">{field.label}</label>
        <input id="test" className="form-control" type="text" {...field.input} />
        <div className="text-help">
          { touched ? error : '' }
        </div>
      </div>
    );
  }

  renderRadio(field) {
    console.log('field', field)
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        {
          GENDERS.map(gender => (
            <label htmlFor="gender" key={gender}>
              <Field name="gender" id="gender" component="input" type="radio" value={gender} />
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
    console.log('props', this.props);
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
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
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

export default reduxForm({
  validate,
  form: 'DancersNewForm'
})(connect(null, { createDancerAction })(DancersNew));
