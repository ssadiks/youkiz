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
    case types.CREATE_DANCER.REQUEST:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case types.CREATE_DANCER.SUCCESS:
      return {
        ...state,
        dancersList: [...state.dancersList, action.data.data],
        isPending: false
      };
    case types.CREATE_DANCER.FAILURE:
      return {
        ...state,
        error: action.error,
        isPending: false
      };
    case types.DELETE_DANCER.REQUEST:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case types.DELETE_DANCER.SUCCESS:
      return {
        ...state,
        dancersList: state.dancersList.filter(dancer => dancer._id !== action.data.data.id),
        isPending: false
      };
    case types.DELETE_DANCER.FAILURE:
      return {
        ...state,
        error: action.error,
        isPending: false
      };
    case types.UPDATE_DANCER.REQUEST:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case types.UPDATE_DANCER.SUCCESS:
      return {
        ...state,
        dancersList: action.data.data,
        isPending: false
      };
    case types.UPDATE_DANCER.FAILURE:
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
