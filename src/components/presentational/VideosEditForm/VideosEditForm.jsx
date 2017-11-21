import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Select from 'react-select';
import { updateDancerAction, fetchDancerAction, updateVideoAction, fetchVideoAction } from '../../../redux/actions';
import { DANCES_STYLE } from '../../../constants';
import { changePropretiesOfObjectInArray, getArrayOfValue } from '../../../helpers';

class VideosEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dancersTab: [],
      dancers: []
    };
  }

  // OnClick on Update Video button
  onSubmit = (values) => {
    const valuesForm = values;
    console.log('valuesForm', valuesForm);
    const videoId = this.props.videoDetails._id;

    const tabDancers = (values.dancers).slice();
    const dancersData = changePropretiesOfObjectInArray(tabDancers, ['value', 'label'], ['_id', 'name']);

    valuesForm.dancers = dancersData;

    this.props.updateVideoAction(videoId, valuesForm);
    this.props.fetchVideoAction(videoId);
  }

  // OnChange Select Dancers update state
  handleChangeDancers = (dancers) => {
    console.log(dancers);
    const dancersTab = getArrayOfValue(dancers, 'label');
    this.setState({ dancers, dancersTab });
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

  renderSelect = (field) => {
    const { meta: { touched, error } } = field;

    const formGroupClass = classnames({
      DancersNewForm__form__group: true,
    });

    // console.log('field', field);
    return (
      <div className={formGroupClass}>
        <Select
          name="form-field-name"
          options={field.options}
          onChange={value => field.input.onChange(value)}
          placeholder={field.placeholder}
          value={field.input.value}
          multi={field.multi}
          simpleValue={field.simpleValue}
        />
        <div className="text-help">
          { touched ? error : '' }
        </div>
      </div>
    );
  }

  renderCheckbox = ({ input, label }) => (
    <Checkbox
      label={label}
      checked={input.value}
      onCheck={input.onChange}
    />
  );


  render() {
    const { handleSubmit, pristine, submitting, reset, dancersList } = this.props;

    const dancersListSelect = changePropretiesOfObjectInArray(dancersList, ['_id', 'name'], ['value', 'label']);
    const DANCES_STYLE_SELECT = changePropretiesOfObjectInArray(DANCES_STYLE, ['id', 'name'], ['value', 'label']);
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
              name="type"
              component={this.renderSelect}
              options={DANCES_STYLE_SELECT}
              placeholder="Select a dance style"
              multi={false}
              simpleValue
            />
          }
          {
            <Field
              label="Dances style"
              name="dancers"
              component={this.renderSelect}
              options={dancersListSelect}
              // onChange={this.handleChangeDancers}
              placeholder="Select dancers"
              multi
              simpleValue={false}
              // value={this.state.dancers}
            />
          }
          {
            <Field
              name="online"
              id="online"
              component={this.renderCheckbox}
              label="mon label"
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

  if (!values.videoId) {
    errors.videoId = 'Enter a video Id';
  }

  if (!values.type) {
    errors.type = 'Select a dance style';
  }

  if (values.dancers && values.dancers.length === 0) {
    errors.dancers = 'Select dancer(s)';
  }

  return errors;
}

VideosEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  updateDancerAction: PropTypes.func.isRequired,
  fetchDancerAction: PropTypes.func.isRequired,
  updateVideoAction: PropTypes.func.isRequired,
  fetchVideoAction: PropTypes.func.isRequired,
  dancersList: PropTypes.array.isRequired,
  videoDetails: PropTypes.object.isRequired,
};

VideosEditForm = reduxForm({
  validate,
  form: 'VideosEditForm',
  enableReinitialize: true,
})(VideosEditForm);

VideosEditForm = connect(
  state => ({
    videoDetails: state.videosReducer.videoDetails,
    isPending: state.videosReducer.isPending,
    error: state.videosReducer.error,
    initialValues:
      {
        videoId: state.videosReducer.videoDetails && state.videosReducer.videoDetails.videoId,
        song: state.videosReducer.videoDetails && state.videosReducer.videoDetails.song,
        type: state.videosReducer.videoDetails && state.videosReducer.videoDetails.type,
        dancers: state.videosReducer.videoDetails &&
        changePropretiesOfObjectInArray(state.videosReducer.videoDetails.dancers, ['_id', 'name'], ['value', 'label']),
        online: state.videosReducer.videoDetails && state.videosReducer.videoDetails.online,
      }
  }),
  { fetchDancerAction, updateDancerAction, updateVideoAction, fetchVideoAction }
)(VideosEditForm);

export default VideosEditForm;

