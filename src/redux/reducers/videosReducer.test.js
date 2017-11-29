import reducer from './videosReducer';
import * as types from '../actions/types';

describe('Videos Reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      videosList: [],
      videoDetails: {},
      isPending: false,
      error: null
    });
  });

  it('should handle FETCH_VIDEOS_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.FETCH_VIDEOS.REQUEST,
      })
    ).toEqual({
      isPending: true,
      error: null
    });
  });

  it('should handle FETCH_VIDEOS_SUCCESS', () => {
    expect(
      reducer({}, {
        type: types.FETCH_VIDEOS.SUCCESS,
        data: [{ _id: 1, title: 'video 1' }, { _id: 2, title: 'video 2' }]
      })
    ).toEqual({
      videosList: [{ _id: 1, title: 'video 1' }, { _id: 2, title: 'video 2' }],
      isPending: false
    });
  });

  it('should handle FETCH_VIDEOS_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.FETCH_VIDEOS.FAILURE,
        error: 'error'
      })
    ).toEqual({
      error: 'error',
      isPending: false
    });
  });

  it('should handle FETCH_VIDEO_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.FETCH_VIDEO.REQUEST,
      })
    ).toEqual({
      isPending: true,
      error: null
    });
  });

  it('should handle FETCH_VIDEO_SUCCESS', () => {
    expect(
      reducer({}, {
        type: types.FETCH_VIDEO.SUCCESS,
        data: { _id: 1, title: 'video 1' }
      })
    ).toEqual({
      videoDetails: { _id: 1, title: 'video 1' },
      isPending: false
    });
  });

  it('should handle FETCH_VIDEO_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.FETCH_VIDEO.FAILURE,
        error: 'error'
      })
    ).toEqual({
      error: 'error',
      isPending: false
    });
  });

  it('should handle DELETE_VIDEO_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.DELETE_VIDEO.REQUEST,
      })
    ).toEqual({
      isPending: true,
      error: null
    });
  });

  it('should handle DELETE_VIDEO_SUCCESS', () => {
    const state = { videosList: [{ _id: 1, title: 'video 1' }, { _id: 2, title: 'video 2' }] };
    const output = [{ _id: 1, title: 'video 1' }];
    expect(
      reducer(state, {
        type: types.DELETE_VIDEO.SUCCESS,
        data: { data: { id: 2 } }
      })
    ).toEqual({
      videosList: output,
      isPending: false
    });
  });

  it('should handle DELETE_VIDEO_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.DELETE_VIDEO.FAILURE,
        error: 'error'
      })
    ).toEqual({
      error: 'error',
      isPending: false
    });
  });

  it('should handle UPDATE_VIDEO_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.UPDATE_VIDEO.REQUEST,
      })
    ).toEqual({
      isPending: true,
      error: null
    });
  });

  it('should handle UPDATE_VIDEO_SUCCESS', () => {
    const state = { videosList: [{ _id: 1, title: 'video 1' }, { _id: 2, title: 'video 2' }] };
    const output = [{ _id: 1, title: 'video 1' }, { _id: 2, title: 'video 22' }];
    const outputDetails = { _id: 2, title: 'video 22' };
    expect(
      reducer(state, {
        type: types.UPDATE_VIDEO.SUCCESS,
        data: { _id: 2, title: 'video 22' }
      })
    ).toEqual({
      videosList: output,
      videoDetails: outputDetails,
      isPending: false
    });
  });

  it('should handle UPDATE_VIDEO_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.UPDATE_VIDEO.FAILURE,
        error: 'error'
      })
    ).toEqual({
      error: 'error',
      isPending: false
    });
  });

  it('should handle CREATE_VIDEO_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.CREATE_VIDEO.REQUEST,
      })
    ).toEqual({
      isPending: true,
      error: null
    });
  });

  it('should handle CREATE_VIDEO_SUCCESS', () => {
    const state = { videosList: [{ _id: 1, title: 'video 1' }] };
    const output = [{ _id: 1, title: 'video 1' }, { _id: 2, title: 'video 2' }];
    const outputDetails = { _id: 2, title: 'video 2' };
    expect(
      reducer(state, {
        type: types.CREATE_VIDEO.SUCCESS,
        data: { _id: 2, title: 'video 2' }
      })
    ).toEqual({
      videosList: output,
      videoDetails: outputDetails,
      isPending: false
    });
  });

  it('should handle CREATE_VIDEO_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.CREATE_VIDEO.FAILURE,
        error: 'error'
      })
    ).toEqual({
      error: 'error',
      isPending: false
    });
  });

  it('should handle RESET_VIDEO', () => {
    expect(
      reducer({}, {
        type: types.RESET_VIDEO
      })
    ).toEqual({
      videoDetails: {},
    });
  });
});
