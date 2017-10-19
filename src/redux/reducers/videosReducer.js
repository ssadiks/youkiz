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
    case types.DELETE_VIDEO.REQUEST:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case types.DELETE_VIDEO.SUCCESS:
      return {
        ...state,
        videosList: state.videosList.filter(video => video._id !== action.data.data.id),
        isPending: false
      };
    case types.DELETE_VIDEO.FAILURE:
      return {
        ...state,
        error: action.error,
        isPending: false
      };
    case types.UPDATE_VIDEO.REQUEST:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case types.UPDATE_VIDEO.SUCCESS:
      return {
        ...state,
        videosList: state.videosList.map((item) => {
          if (item._id !== action.data.data._id) {
            return item;
          }
          return action.data.data;
        }),
        isPending: false
      };
    case types.UPDATE_VIDEO.FAILURE:
      return {
        ...state,
        error: action.error,
        isPending: false
      };
    case types.RESET_VIDEO:
      return {
        ...state,
        videoDetails: {}
      };
    default:
      return state;
  }
};

export default videosReducer;
