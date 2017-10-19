import { connect } from 'react-redux';
import BackOffice from '../presentational/BackOffice/BackOffice';
import { fetchDancersAction, deleteDancerAction, fetchDancerAction, resetDancerAction, fetchVideosAction, fetchVideoAction } from '../../redux/actions';

const mapStateToProps = state => ({
  dancersList: state.dancersReducer.dancersList,
  isPending: state.dancersReducer.isPending,
  error: state.dancersReducer.error,
  videosList: state.videosReducer.videosList,
});

const BackOfficeContainer = connect(mapStateToProps, {
  fetchDancersAction,
  deleteDancerAction,
  fetchDancerAction,
  resetDancerAction,
  fetchVideosAction,
  fetchVideoAction,
})(BackOffice);

export default BackOfficeContainer;
