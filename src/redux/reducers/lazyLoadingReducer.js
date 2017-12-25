import * as types from '../actions/types';
import { VIDEOS_LIMIT } from '../../constants';

const initialState = () => ({
  lazyLoadingDisabled: false,
  params: {
    filters: {
      dancers: [],
      online: true,
      type: ''
    },
    limit: VIDEOS_LIMIT,
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
    case types.RESET_VIDEOS_PARAMS:
      console.log('reducer avant le return')
      return initialState();

    default:
      return state;
  }
};

export default lazyLoadingReducer;
