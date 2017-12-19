const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach((type) => { res[type] = `${base}_${type}`; });
  return res;
}

export const FETCH_VIDEOS = createRequestTypes('FETCH_VIDEOS');
export const FETCH_VIDEO = createRequestTypes('FETCH_VIDEO');
export const DELETE_VIDEO = createRequestTypes('DELETE_VIDEO');
export const CREATE_VIDEO = createRequestTypes('CREATE_VIDEO');
export const UPDATE_VIDEO = createRequestTypes('UPDATE_VIDEO');
export const RESET_VIDEO = 'RESET_VIDEO';

export const FETCH_DANCERS = createRequestTypes('FETCH_DANCERS');
export const FETCH_DANCER = createRequestTypes('FETCH_DANCER');
export const CREATE_DANCER = createRequestTypes('CREATE_DANCER');
export const DELETE_DANCER = createRequestTypes('DELETE_DANCER');
export const UPDATE_DANCER = createRequestTypes('UPDATE_DANCER');
export const RESET_DANCER = 'RESET_DANCER';

export const UPDATE_SNACK_MESSAGE = 'UPDATE_SNACK_MESSAGE';

export const OPEN_MODAL_DIALOG = 'OPEN_MODAL_DIALOG';
export const HIDE_MODAL_DIALOG = 'HIDE_MODAL_DIALOG';

export const SET_LOCALE = createRequestTypes('SET_LOCALE');

export const TOGGLE_MENU = 'TOGGLE_MENU';

export const ALL_VIDEOS_LOADED = 'ALL_VIDEOS_LOADED';
