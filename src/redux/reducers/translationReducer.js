import * as types from '../actions/types';
import { BROWSER_LOCALE } from '../../constants';
import { getCookie } from '../../helpers';

const initialState = () => ({
  locale: getCookie('locale') || BROWSER_LOCALE
});

const translationReducer = (state = initialState(), action) => {
  switch (action.type) {
    case types.SET_LOCALE.REQUEST:
      return {
        ...state,
        error: null
      };
    case types.SET_LOCALE.SUCCESS:
      return {
        ...state,
        locale: action.locale,
        isPending: false
      };
    case types.SET_LOCALE.FAILURE:
      return {
        ...state,
        error: action.error,
        isPending: false,
      };

    default:
      return state;
  }
};


export default translationReducer;
