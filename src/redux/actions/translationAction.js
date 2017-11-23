import * as types from './types';
import { setLocale } from '../../helpers';

const setLocaleRequest = () => ({ type: types.SET_LOCALE.REQUEST });
const setLocaleSuccess = locale => ({ type: types.SET_LOCALE.SUCCESS, locale });
const setLocaleFailure = error => ({ type: types.SET_LOCALE.FAILURE, error });

export const setLocaleAction = locale => (dispatch) => {
  dispatch(setLocaleRequest());
  return setLocale(locale)
    .then(res => dispatch(setLocaleSuccess(res)))
    .catch(error => dispatch(setLocaleFailure(error)));
};
