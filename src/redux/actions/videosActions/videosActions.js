import * as types from '../types';
import { fetchVideos, fetchVideo, deleteVideo, createVideo, updateVideo } from '../../../api/videos';
import { updateSnackMessage, hideModalDialog } from '../index';
import { SNACKBAR_MSG } from '../../../constants';

/* Create Video Actions */

const createVideoRequest = () => ({ type: types.CREATE_VIDEO.REQUEST });
const createVideoSuccess = data => ({ type: types.CREATE_VIDEO.SUCCESS, data });
const createVideoFailure = error => ({ type: types.CREATE_VIDEO.FAILURE, error });

export const createVideoAction = params => (dispatch) => {
  dispatch(createVideoRequest());
  return createVideo(params)
    .then((res) => {
      dispatch(createVideoSuccess(res.data));
      dispatch(updateSnackMessage({
        state: true,
        message: SNACKBAR_MSG.SUCCESS.VIDEO_CREATE
      }));
    })
    .catch((error) => {
      dispatch(createVideoFailure(error));
      dispatch(updateSnackMessage({
        state: true,
        message: SNACKBAR_MSG.FAILURE.VIDEO_CREATE
      }));
    });
};

/* Update Videos actions */

const updateVideoRequest = () => ({ type: types.UPDATE_VIDEO.REQUEST });
const updateVideoSuccess = data => ({ type: types.UPDATE_VIDEO.SUCCESS, data });
const updateVideoFailure = error => ({ type: types.UPDATE_VIDEO.FAILURE, error });

export const updateVideoAction = (id, params) => (dispatch) => {
  dispatch(updateVideoRequest());
  return updateVideo(id, params)
    .then((res) => {
      dispatch(updateVideoSuccess(res.data));
      dispatch(updateSnackMessage({
        state: true,
        message: SNACKBAR_MSG.SUCCESS.VIDEO_UPDATE
      }));
    })
    .catch((error) => {
      dispatch(updateVideoFailure(error));
      dispatch(updateSnackMessage({
        state: false,
        message: SNACKBAR_MSG.FAILURE.VIDEO_UPDATE
      }));
    });
};

/* Fetch Videos Actions */

const fetchVideosRequest = () => ({ type: types.FETCH_VIDEOS.REQUEST });
const fetchVideosSuccess = data => ({ type: types.FETCH_VIDEOS.SUCCESS, data });
const fetchVideosFailure = error => ({ type: types.FETCH_VIDEOS.FAILURE, error });

export const fetchVideosAction = params => (dispatch) => {
  dispatch(fetchVideosRequest());
  return fetchVideos(params)
    .then(res => dispatch(fetchVideosSuccess(res.data)))
    .catch(error => dispatch(fetchVideosFailure(error)));
};

/* Fetch Video Actions */

const fetchVideoRequest = () => ({ type: types.FETCH_VIDEO.REQUEST });
const fetchVideoSuccess = data => ({ type: types.FETCH_VIDEO.SUCCESS, data });
const fetchVideoFailure = error => ({ type: types.FETCH_VIDEO.FAILURE, error });

export const fetchVideoAction = id => (dispatch) => {
  dispatch(fetchVideoRequest());
  return fetchVideo(id)
    .then(res => dispatch(fetchVideoSuccess(res.data)))
    .catch(error => dispatch(fetchVideoFailure(error)));
};

/* Delete Video Actions */

const deleteVideoRequest = () => ({ type: types.DELETE_VIDEO.REQUEST });
const deleteVideoSuccess = data => ({ type: types.DELETE_VIDEO.SUCCESS, data });
const deleteVideoFailure = error => ({ type: types.DELETE_VIDEO.FAILURE, error });

export const deleteVideoAction = id => (dispatch) => {
  dispatch(deleteVideoRequest());
  return deleteVideo(id)
    .then((res) => {
      dispatch(deleteVideoSuccess(res.data));
      dispatch(updateSnackMessage({
        state: true,
        message: SNACKBAR_MSG.SUCCESS.VIDEO_DELETE
      }));
      dispatch(hideModalDialog());
    })
    .catch((error) => {
      dispatch(deleteVideoFailure(error));
      dispatch(updateSnackMessage({
        state: false,
        message: SNACKBAR_MSG.FAILURE.VIDEO_DELETE
      }));
    });
};