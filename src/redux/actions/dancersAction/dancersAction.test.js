import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  fetchDancersAction,
  createDancerAction,
  fetchDancerAction,
  deleteDancerAction,
  updateDancerAction,
  resetDancerAction
} from './dancersAction';
import * as types from '../types';
import { SNACKBAR_MSG } from '../../../constants';

jest.mock('axios');


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('FETCH_DANCERS.SUCCESS action', () => {
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

  it('FETCH_DANCERS.FAILURE action', () => {
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

  it('FETCH_DANCER.SUCCESS action', () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: { id: 1, name: 'dancer 1' },
        headers: { 'content-type': 'application/json' }
      })
    );

    const expectedActions = [
      { type: types.FETCH_DANCER.REQUEST },
      { type: types.FETCH_DANCER.SUCCESS, data: { id: 1, name: 'dancer 1' } }
    ];
    const store = mockStore({ dancerDetails: null });

    return store.dispatch(fetchDancerAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('FETCH_DANCER.FAILURE action', () => {
    axios.get.mockImplementation(() =>
      Promise.reject({
        code: 'CODE_ERROR',
        headers: { 'content-type': 'application/json' }
      })
    );

    const store = mockStore({ error: '' });

    return store.dispatch(fetchDancerAction()).then(() => {
      expect(store.getActions()).rejects.toBeDefined();
    });
  });

  it('CREATE_DANCER.SUCCESS action', () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: [{ id: 1, name: 'dancer 1' }],
        headers: { 'content-type': 'application/json' }
      })
    );

    const expectedActions = [
      { type: types.CREATE_DANCER.REQUEST },
      { type: types.CREATE_DANCER.SUCCESS, data: [{ id: 1, name: 'dancer 1' }] },
      {
        type: types.UPDATE_SNACK_MESSAGE,
        data: { state: true, message: SNACKBAR_MSG.SUCCESS.DANCER_CREATE }
      }
    ];
    const store = mockStore({ dancersList: null });

    return store.dispatch(createDancerAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('CREATE_DANCER.FAILURE action', () => {
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

  it('UPDATE_DANCER.SUCCESS action', () => {
    axios.put.mockImplementation(() =>
      Promise.resolve({
        data: { id: 1, name: 'dancer 1' },
        headers: { 'content-type': 'application/json' }
      })
    );

    const expectedActions = [
      { type: types.UPDATE_DANCER.REQUEST },
      { type: types.UPDATE_DANCER.SUCCESS, data: { id: 1, name: 'dancer 1' } },
      {
        type: types.UPDATE_SNACK_MESSAGE,
        data: { state: true, message: SNACKBAR_MSG.SUCCESS.DANCER_UPDATE }
      }
    ];
    const store = mockStore({ dancersList: null });

    return store.dispatch(updateDancerAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('UPDATE_DANCER.FAILURE action', () => {
    axios.put.mockImplementation(() =>
      Promise.reject({
        code: 'CODE_ERROR',
        headers: { 'content-type': 'application/json' }
      })
    );

    const store = mockStore({ error: '' });

    return store.dispatch(updateDancerAction()).then(() => {
      expect(store.getActions()).rejects.toBeDefined();
    });
  });

  it('DELETE_DANCER.SUCCESS action', () => {
    axios.delete.mockImplementation(() =>
      Promise.resolve({
        data: { id: 1, name: 'dancer 1' },
        headers: { 'content-type': 'application/json' }
      })
    );

    const expectedActions = [
      { type: types.DELETE_DANCER.REQUEST },
      { type: types.DELETE_DANCER.SUCCESS, data: { id: 1, name: 'dancer 1' } },
      {
        type: types.UPDATE_SNACK_MESSAGE,
        data: { state: true, message: SNACKBAR_MSG.SUCCESS.DANCER_DELETE }
      },
      { type: types.HIDE_MODAL_DIALOG }
    ];
    const store = mockStore({ dancersList: null });

    return store.dispatch(deleteDancerAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('DELETE_DANCER.FAILURE action', () => {
    axios.delete.mockImplementation(() =>
      Promise.reject({
        code: 'CODE_ERROR',
        headers: { 'content-type': 'application/json' }
      })
    );

    const store = mockStore({ error: '' });

    return store.dispatch(deleteDancerAction()).then(() => {
      expect(store.getActions()).rejects.toBeDefined();
    });
  });

  it('RESET_DANCER action', () => {
    const expectedActions = [
      { type: types.RESET_DANCER }
    ];
    const store = mockStore({ dancersList: null });

    return store.dispatch(resetDancerAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
