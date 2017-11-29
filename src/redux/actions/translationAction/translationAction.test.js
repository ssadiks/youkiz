import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setLocaleAction } from './translationAction';
import * as helpers from '../../../helpers';
import * as types from '../types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('creates SET_LOCALE.SUCCESS when locale is handled', () => {
    helpers.setLocale = jest.fn();
    helpers.setLocale.mockImplementation(() =>
      Promise.resolve('es')
    );

    const expectedActions = [
      { type: types.SET_LOCALE.REQUEST },
      { type: types.SET_LOCALE.SUCCESS, locale: 'es' }
    ];
    const store = mockStore({ locale: null });

    return store.dispatch(setLocaleAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates SET_LOCALE.FAILURE when locale is not handled', () => {
    helpers.setLocale = jest.fn();
    helpers.setLocale.mockImplementation(() =>
      Promise.reject('wrong locale')
    );

    const store = mockStore({ error: '' });

    return store.dispatch(setLocaleAction()).then(() => {
      expect(store.getActions()).rejects.toBeDefined();
    });
  });
});
