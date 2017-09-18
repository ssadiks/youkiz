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
export const FETCH_DANCERS = createRequestTypes('FETCH_DANCERS');
export const FETCH_DANCER = createRequestTypes('FETCH_DANCER');
