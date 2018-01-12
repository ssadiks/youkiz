import { connect } from 'react-redux';
import VideosList from '../../presentational/VideosList/VideosList';
import {
  fetchVideosAction,
  fetchDancersAction,
  deleteVideoAction,
  openModalDialog,
  hideModalDialog,
  resetVideosListAction,
  toggleLazyLoading,
  updateVideosParams,
  resetVideosParamsAction
} from '../../../redux/actions/index';

const mapStateToProps = state => ({
  videosList: state.videosReducer.videosList,
  dancersList: state.dancersReducer.dancersList,
  isPending: state.videosReducer.isPending,
  error: state.videosReducer.error,
  params: state.lazyLoadingReducer.params
});

const VideosListContainer = connect(mapStateToProps, {
  fetchVideosAction,
  fetchDancersAction,
  deleteVideoAction,
  openModalDialog,
  hideModalDialog,
  resetVideosListAction,
  toggleLazyLoading,
  updateVideosParams,
  resetVideosParamsAction
})(VideosList);

const loadData = (store) => {
  return store.dispatch(fetchVideosAction());
}

export default {
  loadData,
  component: VideosListContainer
};
