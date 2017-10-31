import reducer from './dancersReducer';
import * as types from '../actions/types';

describe('Dancers Reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      dancersList: null,
      dancerDetails: {},
      isPending: false,
      error: null
    });
  });

  it('should handle FETCH_DANCERS_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.FETCH_DANCERS.REQUEST,
      })
    ).toEqual({
      isPending: true,
      error: null
    });
  });

  it('should handle FETCH_DANCERS_SUCCESS', () => {
    expect(
      reducer({}, {
        type: types.FETCH_DANCERS.SUCCESS,
        data: [{ _id: 1, name: 'dancer 1' }, { _id: 2, name: 'dancer 2' }]
      })
    ).toEqual({
      dancersList: [{ _id: 1, name: 'dancer 1' }, { _id: 2, name: 'dancer 2' }],
      isPending: false
    });
  });

  it('should handle FETCH_DANCERS_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.FETCH_DANCERS.FAILURE,
        error: 'error'
      })
    ).toEqual({
      error: 'error',
      isPending: false
    });
  });

  it('should handle FETCH_DANCER_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.FETCH_DANCER.REQUEST,
      })
    ).toEqual({
      isPending: true,
      error: null
    });
  });

  it('should handle FETCH_DANCER_SUCCESS', () => {
    expect(
      reducer({}, {
        type: types.FETCH_DANCER.SUCCESS,
        data: { _id: 1, name: 'dancer 1' }
      })
    ).toEqual({
      dancerDetails: { _id: 1, name: 'dancer 1' },
      isPending: false
    });
  });

  it('should handle FETCH_DANCER_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.FETCH_DANCER.FAILURE,
        error: 'error'
      })
    ).toEqual({
      error: 'error',
      isPending: false
    });
  });

  it('should handle DELETE_DANCER_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.DELETE_DANCER.REQUEST,
      })
    ).toEqual({
      isPending: true,
      error: null
    });
  });

  it('should handle DELETE_DANCER_SUCCESS', () => {
    const state = { dancersList: [{ _id: 1, name: 'dancer 1' }, { _id: 2, name: 'dancer 2' }] };
    const output = [{ _id: 1, name: 'dancer 1' }];
    expect(
      reducer(state, {
        type: types.DELETE_DANCER.SUCCESS,
        data: { id: 2 }
      })
    ).toEqual({
      dancersList: output,
      isPending: false
    });
  });

  it('should handle DELETE_DANCER_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.DELETE_DANCER.FAILURE,
        error: 'error'
      })
    ).toEqual({
      error: 'error',
      isPending: false
    });
  });

  it('should handle CREATE_DANCER_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.CREATE_DANCER.REQUEST,
      })
    ).toEqual({
      isPending: true,
      error: null
    });
  });

  it('should handle CREATE_DANCER_SUCCESS', () => {
    const state = { dancersList: [{ _id: 1, title: 'dancer 1' }] };
    const output = [{ _id: 1, title: 'dancer 1' }, { _id: 2, title: 'dancer 2' }];
    expect(
      reducer(state, {
        type: types.CREATE_DANCER.SUCCESS,
        data: { _id: 2, title: 'dancer 2' }
      })
    ).toEqual({
      dancersList: output,
      isPending: false
    });
  });

  it('should handle CREATE_DANCER_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.CREATE_DANCER.FAILURE,
        error: 'error'
      })
    ).toEqual({
      error: 'error',
      isPending: false
    });
  });

  it('should handle UPDATE_DANCER_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.UPDATE_DANCER.REQUEST,
      })
    ).toEqual({
      isPending: true,
      error: null
    });
  });

  it('should handle UPDATE_DANCER_SUCCESS', () => {
    const state = { dancersList: [{ _id: 1, title: 'dancer 1' }, { _id: 2, title: 'dancer 2' }] };
    const output = [{ _id: 1, title: 'dancer 1' }, { _id: 2, title: 'dancer 22' }];
    expect(
      reducer(state, {
        type: types.UPDATE_DANCER.SUCCESS,
        data: { _id: 2, title: 'dancer 22' }
      })
    ).toEqual({
      dancersList: output,
      isPending: false
    });
  });

  it('should handle UPDATE_DANCER_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.UPDATE_DANCER.FAILURE,
        error: 'error'
      })
    ).toEqual({
      error: 'error',
      isPending: false
    });
  });

  it('should handle RESET_DANCER', () => {
    expect(
      reducer({}, {
        type: types.RESET_DANCER
      })
    ).toEqual({
      dancerDetails: {},
    });
  });
});
