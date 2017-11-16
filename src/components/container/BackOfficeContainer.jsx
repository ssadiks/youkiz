import { connect } from 'react-redux';
import BackOffice from '../presentational/BackOffice/BackOffice';
import {
  fetchDancersAction,
  deleteDancerAction,
  fetchDancerAction,
  resetDancerAction,
  fetchVideosAction,
  fetchVideoAction,
  updateSnackMessage
} from '../../redux/actions';

const mapStateToProps = state => ({
  dancersList: state.dancersReducer.dancersList,
  isPending: state.dancersReducer.isPending,
  error: state.dancersReducer.error,
  createDancerSuccess: state.dancersReducer.createDancerSuccess,
  deleteDancerSuccess: state.dancersReducer.deleteDancerSuccess,
  videosList: state.videosReducer.videosList,
  snackMessage: state.snackMessageReducer.snackMessage
});

const BackOfficeContainer = connect(mapStateToProps, {
  fetchDancersAction,
  deleteDancerAction,
  fetchDancerAction,
  resetDancerAction,
  fetchVideosAction,
  fetchVideoAction,
  updateSnackMessage
})(BackOffice);

export default BackOfficeContainer;
