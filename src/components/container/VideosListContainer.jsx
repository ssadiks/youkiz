import { connect } from 'react-redux';
import VideosList from '../presentational/VideosList/VideosList';
import { fetchVideosAction, fetchDancersAction } from '../../redux/actions';

const mapStateToProps = state => ({
  videosList: state.videosReducer.videosList,
  dancersList: state.dancersReducer.dancersList,
  isPending: state.videosReducer.isPending,
  error: state.videosReducer.error,
});

const VideosListContainer = connect(mapStateToProps, {
  fetchVideosAction,
  fetchDancersAction
})(VideosList);

export default VideosListContainer;
