import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateDancerAction, fetchDancerAction } from '../../../redux/actions';
import { GENDERS } from '../../../constants';

class DancersEdit extends Component {
  onSubmit = (values) => {
    this.props.updateDancerAction(this.props.selectedDancer, values);
    this.props.resetDancerDetails();
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label htmlFor={`${field.name}Edit`}>{field.label}</label>
        <input id={`${field.name}Edit`} className="form-control" type="text" placeholder={field.label} {...field.input} />
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
            <label htmlFor={`genderEdit${gender}`} key={gender}>
              <Field name="gender" id={`genderEdit${gender}`} component="input" type="radio" value={gender} />
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
    const { handleSubmit, resetDancerDetails } = this.props;

    return (
      <div className="DancersEdit">
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
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" onClick={resetDancerDetails}>
              Return
            </button>
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

DancersEdit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  updateDancerAction: PropTypes.func.isRequired,
  fetchDancerAction: PropTypes.func.isRequired,
  resetDancerDetails: PropTypes.func.isRequired,
  selectedDancer: PropTypes.string.isRequired,
};

DancersEdit = reduxForm({
  validate,
  form: 'DancersEditForm',
  enableReinitialize: true,
})(DancersEdit);

DancersEdit = connect(
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
)(DancersEdit);

export default DancersEdit;

