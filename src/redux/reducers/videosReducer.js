import * as types from '../actions/types';

const initialState = () => ({
  videosList: [],
  videoDetails: {},
  isPending: false,
  error: null
});

const videosReducer = (state = initialState(), action) => {
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
        videosList: state.videosList.concat(action.data),
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
        videoDetails: action.data,
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
        videosList:
          state.videosList ?
            state.videosList.filter(video => video._id !== action.data.id) : [],
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
          if (item._id !== action.data._id) {
            return item;
          }
          return action.data;
        }),
        videoDetails: action.data,
        isPending: false
      };
    case types.UPDATE_VIDEO.FAILURE:
      return {
        ...state,
        error: action.error,
        isPending: false
      };
    case types.CREATE_VIDEO.REQUEST:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case types.CREATE_VIDEO.SUCCESS:
      return {
        ...state,
        videosList: [...state.videosList, action.data],
        videoDetails: action.data,
        isPending: false
      };
    case types.CREATE_VIDEO.FAILURE:
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
