import * as types from './types';
import { fetchDancers, fetchDancer, createDancer, deleteDancer, updateDancer } from '../../api/dancers';

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

export const fetchDancersAction = params => (dispatch) => {
  dispatch(fetchDancersRequest());
  return fetchDancers(params)
    .then(res => dispatch(fetchDancersSuccess(res.data)))
    .catch(error => dispatch(fetchDancersFailure(error)));
};

export const fetchDancerAction = id => (dispatch) => {
  dispatch(fetchDancerRequest());
  return fetchDancer(id)
    .then(res => dispatch(fetchDancerSuccess(res.data)))
    .catch(error => dispatch(fetchDancerFailure(error)));
};

export const createDancerAction = params => (dispatch) => {
  dispatch(createDancerRequest());
  return createDancer(params)
    .then(res => dispatch(createDancerSuccess(res.data)))
    .catch(error => dispatch(createDancerFailure(error)));
};

export const deleteDancerAction = id => (dispatch) => {
  dispatch(deleteDancerRequest());
  return deleteDancer(id)
    .then(res => dispatch(deleteDancerSuccess(res.data)))
    .catch(error => dispatch(deleteDancerFailure(error)));
};

export const updateDancerAction = (id, params) => (dispatch) => {
  dispatch(updateDancerRequest());
  return updateDancer(id, params)
    .then(res => dispatch(updateDancerSuccess(res.data)))
    .catch(error => dispatch(updateDancerFailure(error)));
};

export const resetDancerAction = () => ({ type: types.RESET_DANCER });
