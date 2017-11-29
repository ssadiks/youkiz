import { connect } from 'react-redux';
import VideosList from '../../presentational/VideosList/VideosList';
import {
  fetchVideosAction,
  fetchDancersAction,
  deleteVideoAction,
  openModalDialog,
  hideModalDialog
} from '../../../redux/actions/index';

const mapStateToProps = state => ({
  videosList: state.videosReducer.videosList,
  dancersList: state.dancersReducer.dancersList,
  isPending: state.videosReducer.isPending,
  error: state.videosReducer.error,
});

const VideosListContainer = connect(mapStateToProps, {
  fetchVideosAction,
  fetchDancersAction,
  deleteVideoAction,
  openModalDialog,
  hideModalDialog
})(VideosList);

export default VideosListContainer;
