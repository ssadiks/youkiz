import * as types from '../actions/types';

const INITIAL_STATE = {
  dancersList: [],
  DancerDetails: {},
  isPending: false,
  error: null
};

const dancersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_DANCERS.REQUEST:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case types.FETCH_DANCERS.SUCCESS:
      return {
        ...state,
        dancersList: action.data.data,
        isPending: false
      };
    case types.FETCH_DANCERS.FAILURE:
      return {
        ...state,
        error: action.error,
        isPending: false
      };
    case types.FETCH_DANCER.REQUEST:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case types.FETCH_DANCER.SUCCESS:
      return {
        ...state,
        dancerDetails: action.data.data,
        isPending: false
      };
    case types.FETCH_DANCER.FAILURE:
      return {
        ...state,
        error: action.error,
        isPending: false
      };
    default:
      return state;
  }
};

export default dancersReducer;
