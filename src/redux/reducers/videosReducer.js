import * as types from '../actions/types';

const INITIAL_STATE = {
  videosList: [],
  videoDetails: {},
  isPending: false,
  error: null
};

const videosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_VIDEOS.REQUEST:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case types.FETCH_VIDEOS.SUCCESS:
      return {
        ...state,
        videosList: action.data.data,
        isPending: false
      };
    case types.FETCH_VIDEOS.FAILURE:
      return {
        ...state,
        error: action.error,
        isPending: false
      };
    case types.FETCH_VIDEO.REQUEST:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case types.FETCH_VIDEO.SUCCESS:
      return {
        ...state,
        videoDetails: action.data.data,
        isPending: false
      };
    case types.FETCH_VIDEO.FAILURE:
      return {
        ...state,
        error: action.error,
        isPending: false
      };
    default:
      return state;
  }
};

export default videosReducer;
