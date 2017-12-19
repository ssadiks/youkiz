import * as types from '../actions/types';

const initialState = () => ({
  allVideosLoaded: false,
});

const lazyLoadingReducer = (state = initialState(), action) => {
  switch (action.type) {
    case types.ALL_VIDEOS_LOADED:
      return {
        ...state,
        allVideosLoaded: true
      };

    default:
      return state;
  }
};

export default lazyLoadingReducer;
