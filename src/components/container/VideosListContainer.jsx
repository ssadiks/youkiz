import { connect } from 'react-redux';
import VideosList from '../presentational/VideosList/VideosList';
import { fetchVideosAction } from '../../redux/actions';

const mapStateToProps = state => ({
  videosList: state.videosReducer.videosList,
  isPending: state.videosReducer.isPending,
  error: state.videosReducer.error,
});

const VideosListContainer = connect(mapStateToProps, {
  fetchVideosAction
})(VideosList);

export default VideosListContainer;
