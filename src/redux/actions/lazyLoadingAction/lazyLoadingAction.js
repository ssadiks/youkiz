import * as types from '../types';

export const toggleLazyLoading = () => ({ type: types.TOGGLE_LAZY_LOADING });
export const updateVideosParams = data => ({ type: types.UPDATE_VIDEOS_PARAMS, data });

export const resetVideosParamsAction = () => ({ type: types.RESET_VIDEOS_PARAMS });
