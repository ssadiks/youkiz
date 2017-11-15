import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { fetchDancersAction, createDancerAction } from './dancersAction';
import * as types from './types';

jest.mock('axios');


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('creates FETCH_DANCERS.SUCCESS when fetching dancers has been done', () => {

    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [{ id: 1, name: 'dancer 1' }],
        headers: { 'content-type': 'application/json' }
      })
    );

    const expectedActions = [
      { type: types.FETCH_DANCERS.REQUEST },
      { type: types.FETCH_DANCERS.SUCCESS, data: [{ id: 1, name: 'dancer 1' }] }
    ];
    const store = mockStore({ dancersList: null });

    return store.dispatch(fetchDancersAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_DANCERS.FAILURE when fetching dancers failed', () => {
    axios.get.mockImplementation(() =>
      Promise.reject({
        code: 'CODE_ERROR',
        headers: { 'content-type': 'application/json' }
      })
    );

    const store = mockStore({ error: '' });

    return store.dispatch(fetchDancersAction()).then(() => {
      expect(store.getActions()).rejects.toBeDefined();
    });
  });

  it('creates CREATE_DANCER.SUCCESS when create dancer has been done', () => {

    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: [{ id: 1, name: 'dancer 1' }],
        headers: { 'content-type': 'application/json' }
      })
    );

    const expectedActions = [
      { type: types.CREATE_DANCER.REQUEST },
      { type: types.CREATE_DANCER.SUCCESS, data: [{ id: 1, name: 'dancer 1' }] }
    ];
    const store = mockStore({ dancersList: null });

    return store.dispatch(createDancerAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates CREATE_DANCER.FAILURE when create dancer failed', () => {
    axios.post.mockImplementation(() =>
      Promise.reject({
        code: 'CODE_ERROR',
        headers: { 'content-type': 'application/json' }
      })
    );

    const store = mockStore({ error: '' });

    return store.dispatch(createDancerAction()).then(() => {
      expect(store.getActions()).rejects.toBeDefined();
    });
  });
});
