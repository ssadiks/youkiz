import * as types from '../actions/types';

const initialState = () => ({
  lazyLoadingDisabled: false,
  params: {
    filters: {
      dancers: [],
      online: true,
      type: ''
    },
    limit: 5,
    page: 1
  }
});

const lazyLoadingReducer = (state = initialState(), action) => {
  switch (action.type) {
    case types.TOGGLE_LAZY_LOADING:
      return {
        ...state,
        lazyLoadingDisabled: !state.lazyLoadingDisabled,
        params: {
          ...state.params,
          page: 1
        }
      };
    case types.UPDATE_VIDEOS_PARAMS:
      return {
        ...state,
        params: action.data
      };

    default:
      return state;
  }
};

export default lazyLoadingReducer;
