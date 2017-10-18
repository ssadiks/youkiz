import * as types from './types';
import { fetchVideos, fetchVideo, deleteVideo, createVideo } from '../../api/videos';

const fetchVideosRequest = () => ({ type: types.FETCH_VIDEOS.REQUEST });
const fetchVideosSuccess = data => ({ type: types.FETCH_VIDEOS.SUCCESS, data });
const fetchVideosFailure = error => ({ type: types.FETCH_VIDEOS.FAILURE, error });

const fetchVideoRequest = () => ({ type: types.FETCH_VIDEO.REQUEST });
const fetchVideoSuccess = data => ({ type: types.FETCH_VIDEO.SUCCESS, data });
const fetchVideoFailure = error => ({ type: types.FETCH_VIDEO.FAILURE, error });

const deleteVideoRequest = () => ({ type: types.DELETE_VIDEO.REQUEST });
const deleteVideoSuccess = data => ({ type: types.DELETE_VIDEO.SUCCESS, data });
const deleteVideoFailure = error => ({ type: types.DELETE_VIDEO.FAILURE, error });

const createVideoRequest = () => ({ type: types.CREATE_VIDEO.REQUEST });
const createVideoSuccess = data => ({ type: types.CREATE_VIDEO.SUCCESS, data });
const createVideoFailure = error => ({ type: types.CREATE_VIDEO.FAILURE, error });

export const createVideoAction = params => (dispatch) => {
  dispatch(createVideoRequest());
  return createVideo(params)
    .then(res => dispatch(createVideoSuccess(res)))
    .catch(error => dispatch(createVideoFailure(error)));
};

export const fetchVideosAction = params => (dispatch) => {
  dispatch(fetchVideosRequest());
  return fetchVideos(params)
    .then(res => dispatch(fetchVideosSuccess(res)))
    .catch(error => dispatch(fetchVideosFailure(error)));
};

export const fetchVideoAction = id => (dispatch) => {
  dispatch(fetchVideoRequest());
  return fetchVideo(id)
    .then(res => dispatch(fetchVideoSuccess(res)))
    .catch(error => dispatch(fetchVideoFailure(error)));
};

export const deleteVideoAction = id => (dispatch) => {
  dispatch(deleteVideoRequest());
  return deleteVideo(id)
    .then(res => dispatch(deleteVideoSuccess(res)))
    .catch(error => dispatch(deleteVideoFailure(error)));
};
