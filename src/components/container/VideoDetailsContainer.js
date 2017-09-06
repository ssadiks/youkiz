import { connect } from 'react-redux';
import VideoDetails from '../presentational/VideoDetails';
import { fetchVideoAction } from '../../redux/actions';

const mapStateToProps = state => ({
  videoDetails: state.videosReducer.videoDetails,
  isPending: state.videosReducer.isPending,
  error: state.videosReducer.error,
});

const VideosDetailsContainer = connect(mapStateToProps, {
  fetchVideoAction
})(VideoDetails);

export default VideosDetailsContainer;