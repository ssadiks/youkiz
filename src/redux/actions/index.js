import * as types from './types';
import { fetchVideos, fetchVideo } from '../../api/videos';

const fetchVideosRequest = () => ({ type: types.FETCH_VIDEOS.REQUEST });
const fetchVideosSuccess = data => ({ type: types.FETCH_VIDEOS.SUCCESS, data });
const fetchVideosFailure = error => ({ type: types.FETCH_VIDEOS.FAILURE, error });

const fetchVideoRequest = () => ({ type: types.FETCH_VIDEO.REQUEST });
const fetchVideoSuccess = data => ({ type: types.FETCH_VIDEO.SUCCESS, data });
const fetchVideoFailure = error => ({ type: types.FETCH_VIDEO.FAILURE, error });

export const fetchVideosAction = params => (dispatch) => {
  dispatch(fetchVideosRequest());
  return fetchVideos(params)
    .then(res => dispatch(fetchVideosSuccess(res)))
    .catch(error => dispatch(fetchVideosFailure(error)))
}

export const fetchVideoAction = id => (dispatch) => {
  dispatch(fetchVideoRequest());
  return fetchVideo(id)
    .then(res => dispatch(fetchVideoSuccess(res)))
    .catch(error => dispatch(fetchVideoFailure(error)))
}
