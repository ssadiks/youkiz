import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  fetchVideosAction,
  createVideoAction,
  fetchVideoAction,
  deleteVideoAction,
  updateVideoAction
} from './videosActions';
import * as types from '../types';
import { SNACKBAR_MSG } from '../../../constants';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('FETCH_VIDEOS.SUCCESS action', () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [{ id: 1, title: 'video 1' }, { id: 2, title: 'video 2' }],
        headers: { 'content-type': 'application/json' }
      })
    );

    const expectedActions = [
      { type: types.FETCH_VIDEOS.REQUEST },
      { type: types.FETCH_VIDEOS.SUCCESS, data: [{ id: 1, title: 'video 1' }, { id: 2, title: 'video 2' }] }
    ];
    const store = mockStore({ videosList: null });

    return store.dispatch(fetchVideosAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('FETCH_VIDEOS.FAILURE action', () => {
    axios.get.mockImplementation(() =>
      Promise.reject({
        code: 'CODE_ERROR',
        headers: { 'content-type': 'application/json' }
      })
    );

    const store = mockStore({ error: '' });

    return store.dispatch(fetchVideosAction()).then(() => {
      expect(store.getActions()).rejects.toBeDefined();
    });
  });

  it('FETCH_VIDEO.SUCCESS action', () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: { id: 1, title: 'video 1' },
        headers: { 'content-type': 'application/json' }
      })
    );

    const expectedActions = [
      { type: types.FETCH_VIDEO.REQUEST },
      { type: types.FETCH_VIDEO.SUCCESS, data: { id: 1, title: 'video 1' } }
    ];
    const store = mockStore({ videoDetails: null });

    return store.dispatch(fetchVideoAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('FETCH_VIDEO.FAILURE action', () => {
    axios.get.mockImplementation(() =>
      Promise.reject({
        code: 'CODE_ERROR',
        headers: { 'content-type': 'application/json' }
      })
    );

    const store = mockStore({ error: '' });

    return store.dispatch(fetchVideoAction()).then(() => {
      expect(store.getActions()).rejects.toBeDefined();
    });
  });

  it('CREATE_VIDEO.SUCCESS action', () => {
    axios.post.mockImplementation(() =>
      Promise.resolve({
        data: { id: 1, title: 'video 1' },
        headers: { 'content-type': 'application/json' }
      })
    );

    const expectedActions = [
      { type: types.CREATE_VIDEO.REQUEST },
      { type: types.CREATE_VIDEO.SUCCESS, data: { id: 1, title: 'video 1' } },
      {
        type: types.UPDATE_SNACK_MESSAGE,
        data: { state: true, message: SNACKBAR_MSG.SUCCESS.VIDEO_CREATE }
      }
    ];
    const store = mockStore({ videosList: null });

    return store.dispatch(createVideoAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('CREATE_VIDEO.FAILURE action', () => {
    axios.post.mockImplementation(() =>
      Promise.reject({
        code: 'CODE_ERROR',
        headers: { 'content-type': 'application/json' }
      })
    );

    const store = mockStore({ error: '' });

    return store.dispatch(createVideoAction()).then(() => {
      expect(store.getActions()).rejects.toBeDefined();
    });
  });

  it('UPDATE_VIDEO.SUCCESS action', () => {
    axios.put.mockImplementation(() =>
      Promise.resolve({
        data: { id: 1, title: 'video 1' },
        headers: { 'content-type': 'application/json' }
      })
    );

    const expectedActions = [
      { type: types.UPDATE_VIDEO.REQUEST },
      { type: types.UPDATE_VIDEO.SUCCESS, data: { id: 1, title: 'video 1' } },
      {
        type: types.UPDATE_SNACK_MESSAGE,
        data: { state: true, message: SNACKBAR_MSG.SUCCESS.VIDEO_UPDATE }
      }
    ];
    const store = mockStore({ videosList: null });

    return store.dispatch(updateVideoAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('UPDATE_VIDEO.FAILURE action', () => {
    axios.put.mockImplementation(() =>
      Promise.reject({
        code: 'CODE_ERROR',
        headers: { 'content-type': 'application/json' }
      })
    );

    const store = mockStore({ error: '' });

    return store.dispatch(updateVideoAction()).then(() => {
      expect(store.getActions()).rejects.toBeDefined();
    });
  });

  it('DELETE_VIDEO.SUCCESS action', () => {
    axios.delete.mockImplementation(() =>
      Promise.resolve({
        data: { id: 1, title: 'video 1' },
        headers: { 'content-type': 'application/json' }
      })
    );

    const expectedActions = [
      { type: types.DELETE_VIDEO.REQUEST },
      { type: types.DELETE_VIDEO.SUCCESS, data: { id: 1, title: 'video 1' } },
      {
        type: types.UPDATE_SNACK_MESSAGE,
        data: { state: true, message: SNACKBAR_MSG.SUCCESS.VIDEO_DELETE }
      },
      { type: types.HIDE_MODAL_DIALOG }
    ];
    const store = mockStore({ videosList: null });

    return store.dispatch(deleteVideoAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('DELETE_VIDEO.FAILURE action', () => {
    axios.delete.mockImplementation(() =>
      Promise.reject({
        code: 'CODE_ERROR',
        headers: { 'content-type': 'application/json' }
      })
    );

    const store = mockStore({ error: '' });

    return store.dispatch(deleteVideoAction()).then(() => {
      expect(store.getActions()).rejects.toBeDefined();
    });
  });
});
