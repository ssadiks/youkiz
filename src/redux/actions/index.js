import * as types from './types';
import { fetchVideos, fetchVideo } from '../../api/videos';
import { fetchDancers, fetchDancer, createDancer, deleteDancer, updateDancer } from '../../api/dancers';

const fetchVideosRequest = () => ({ type: types.FETCH_VIDEOS.REQUEST });
const fetchVideosSuccess = data => ({ type: types.FETCH_VIDEOS.SUCCESS, data });
const fetchVideosFailure = error => ({ type: types.FETCH_VIDEOS.FAILURE, error });

const fetchVideoRequest = () => ({ type: types.FETCH_VIDEO.REQUEST });
const fetchVideoSuccess = data => ({ type: types.FETCH_VIDEO.SUCCESS, data });
const fetchVideoFailure = error => ({ type: types.FETCH_VIDEO.FAILURE, error });

const fetchDancersRequest = () => ({ type: types.FETCH_DANCERS.REQUEST });
const fetchDancersSuccess = data => ({ type: types.FETCH_DANCERS.SUCCESS, data });
const fetchDancersFailure = error => ({ type: types.FETCH_DANCERS.FAILURE, error });

const fetchDancerRequest = () => ({ type: types.FETCH_DANCER.REQUEST });
const fetchDancerSuccess = data => ({ type: types.FETCH_DANCER.SUCCESS, data });
const fetchDancerFailure = error => ({ type: types.FETCH_DANCER.FAILURE, error });

const createDancerRequest = () => ({ type: types.CREATE_DANCER.REQUEST });
const createDancerSuccess = data => ({ type: types.CREATE_DANCER.SUCCESS, data });
const createDancerFailure = error => ({ type: types.CREATE_DANCER.FAILURE, error });

const deleteDancerRequest = () => ({ type: types.DELETE_DANCER.REQUEST });
const deleteDancerSuccess = data => ({ type: types.DELETE_DANCER.SUCCESS, data });
const deleteDancerFailure = error => ({ type: types.DELETE_DANCER.FAILURE, error });

const updateDancerRequest = () => ({ type: types.UPDATE_DANCER.REQUEST });
const updateDancerSuccess = data => ({ type: types.UPDATE_DANCER.SUCCESS, data });
const updateDancerFailure = error => ({ type: types.UPDATE_DANCER.FAILURE, error });

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

export const fetchDancersAction = params => (dispatch) => {
  dispatch(fetchDancersRequest());
  return fetchDancers(params)
    .then(res => dispatch(fetchDancersSuccess(res)))
    .catch(error => dispatch(fetchDancersFailure(error)));
};

export const fetchDancerAction = id => (dispatch) => {
  dispatch(fetchDancerRequest());
  return fetchDancer(id)
    .then(res => dispatch(fetchDancerSuccess(res)))
    .catch(error => dispatch(fetchDancerFailure(error)));
};

export const createDancerAction = params => (dispatch) => {
  dispatch(createDancerRequest());
  return createDancer(params)
    .then(res => dispatch(createDancerSuccess(res)))
    .catch(error => dispatch(createDancerFailure(error)));
};

export const deleteDancerAction = id => (dispatch) => {
  dispatch(deleteDancerRequest());
  return deleteDancer(id)
    .then(res => dispatch(deleteDancerSuccess(res)))
    .catch(error => dispatch(deleteDancerFailure(error)));
};

export const updateDancerAction = (id, params) => (dispatch) => {
  dispatch(updateDancerRequest());
  return updateDancer(id, params)
    .then(res => dispatch(updateDancerSuccess(res)))
    .catch(error => dispatch(updateDancerFailure(error)));
};

export const resetDancerAction = () => ({ type: types.RESET_DANCER });
